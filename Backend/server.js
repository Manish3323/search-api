const express = require('express')
const path = require('path')
const app = express()
const { ObjectsToArray }= require('../Common/Utility')
const { serverPort } = require('../configuration.json') 
const bodyParser = require('body-parser')
const { queryAllResults, getQuerySuggestions,configureElasticSearch } = require('../Backend/elasticSearch')
const dbUtil  = require('../Backend/db')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../build')));
/*****************DB Connection  & insertion of users on load *************/
dbUtil.connectToDb().then((res)=>{
   dbUtil.findAll().then(data=>{
        console.log(ObjectsToArray(data).length)
        configureElasticSearch(ObjectsToArray(data));
   }).catch(err => console.log('no users found..',err));
}).catch((err)=>{
    console.log('couldnot connect to db.. shutting down')
    process.exit(0)
})


/*****************DB PART ENDS HERE ************************/

/*****************API definations starts here ************************/


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})

app.get('/users',(req,res,next)=>{
    let options={}
    options['indexName']='users'
    queryAllResults(options).then((data)=>{
        return res.json(data.hits.hits);
     }).catch((err)=>{
         console.log(err)
         next()
     })
})

app.post('/users/search',(req,res,next)=>{
    let options={}
    options['query'] = req.body.data.query
    options['indexName'] = 'users'
    let promise = {}
    if(req.body.data.suggest){
        promise = getQuerySuggestions(options)
    }else{
        promise = getQueryResults(options)
    }
    promise.then((data)=>{
        if(req.body.data.suggest){
            return res.json(data.suggest)
        }else{
            return res.json(data.hits.hits)
        }
     }).catch((err)=>{
         console.log(err)
     })
})
/*****************API ENDS HERE ************************/


app.listen(serverPort, () => {
    console.log('listening on port ',serverPort)
})
