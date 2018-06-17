const  { data } = require('../data.json')
const { dbUrl } = require('../configuration.json') 
const mongoose = require('mongoose')
let { UsersSchema, userModel } = require('../Common/UserModel')
const { FAILURE, SUCCESS } = require('../Backend/helpers/constants')
const Model = mongoose.Model

const connectToDb = ()=>{
    return mongoose.connect(dbUrl)
}

mongoose.connection.once('connected',function(err,conn){
    if(err)
    {
        console.log(err);
        process.exit(0);
    }
    var model, models = [];
    for (var i=0; i<data.length; i++) {
      model = new userModel();
      model = data[i]
      models.push(model);
    }
   console.log(models)
        userModel.collection.insert(models, function(err,res){
            console.log('inserting ....')
            if (err) {
                console.log('failed to insert users in db')
                process.exit(0)
            } else {
                console.info('%d Users were successfully stored.', models.length);
            }
        })    
})

const findAll = () =>{
   return userModel.find({},function(err,docs){
        if(err) callback(err,null);
    })
}


exports.connectToDb = connectToDb
exports.findAll = findAll