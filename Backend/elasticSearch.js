const es = require('elasticsearch')
const elasticHost  = require('../configuration.json') 



var client = es.Client({
    host: elasticHost
})

/**
* Delete an existing index
*/
function deleteIndex(indexName) {  
    return client.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex(indexName) {  
    return client.indices.create({
        index: indexName,
        body:settings
    });
}
exports.initIndex = initIndex;

/**
* analyzer settings
*/
var settings = {
    "settings": {
        "analysis": {
            "analyzer": {
                "my_index_analyzer": {
                "type": "custom",
                "tokenizer": "standard",
                "filter": [
                    "lowercase",
                    "mynGram"
                ]
                }
            },
            "filter": {
                "mynGram": {
                "type": "nGram",
                "min_gram": 2,
                "max_gram": 10
                }
            }
        }
    }   
}


/**
* check if the index exists
*/
function indexExists(indexName) {
    return client.indices.exists({
        index: indexName,
    });
}
exports.indexExists = indexExists;  
/**
* appending mapping to index user
*/
function initMapping(indexName) {  
    return client.indices.putMapping({
        index: indexName,
        type: "document",
        body: {
            properties: {
                firstName: { 
                        type: "completion",
                        fields:{
                            "english":{
                                "type":"text",
                                "analyzer":"my_index_analyzer", 
                            }
                        }
                    },
                lastName: { type: "completion",
                            fields:{
                                "english":{
                                    "type":"text",
                                    "analyzer":"my_index_analyzer", 
                                }
                            }
                        },
                photo: { type: "completion" },
                mobile:{ type: "text" },
                email:{ type: "text" },
                address:{ type: "text" },
                city:{ 
                    type: "text",
                    fields:{
                        "english":{
                            "type":"text",
                            "analyzer":"my_index_analyzer", 
                        }
                    } 
                },
                coordinates:{ type: "geo_point" },
                aboutMe:{ type: "text" },
            }
        },
            
    });
}
exports.initMapping = initMapping;

function addDocument(indexName,document) {  
    return client.index({
        index: indexName,
        type: "document",
        body: {
            firstName:document.firstName,
            lastName:document.lastName,
            photo:document.photo,
            mobile:document.mobile,
            email:document.email,
            address:document.address,
            city:document.city,
            coordinates:document.coordinates,
            aboutMe:document.aboutMe
        }
    })
}


exports.addDocument = addDocument;


/**
* QUERIES STARTS HERE
*/

/**
* MATCH on firstname query
*/
function queryResults(input) {
    return client.search({
        "index": input['indexName'],
        "type": "document",
        "body": {
            "query": {
                "match":{
                    "firstName":{
                        "query":input['query']
                    }
                }
            }
        }
    })
}
exports.getQueryResults = queryResults;


/**
* MATCH ALL query
*/
function queryAllResults(input) {
    return client.search({
        "index": input['indexName'],
        "type": "document",
        "body": {
            "query": {
                "match_all":{ }
            }
        }
    })
}
exports.queryAllResults = queryAllResults;

/**
* Suggestion as typing 
*/
function getQuerySuggestions(input) {
    return client.search({
        "index": input['indexName'],
        "type": "document",
        "body": {
            suggest: {
                firstNameSuggester: {
                    prefix: input['query'],
                    completion: {
                        field: "firstName",
                        size: 4,
                        fuzzy: {
                            fuzziness: "auto"
                        }
                    }
                },
                lastNameSuggester: {
                    prefix: input['query'],
                    completion: {
                        field: "lastName",
                        size: 4,
                        fuzzy: {
                            fuzziness: "auto"
                        }
                    }
                },
            }
        }
    })
}
exports.getQuerySuggestions = getQuerySuggestions;


/**************Configuration of elasticsearch at start up ***************/
function configureElasticSearch(data){
    indexExists('users').catch(err => { console.log(err)})
    .then(function (exists) {  
         if (exists) {
            return deleteIndex('users'); 
         } 
    })
    .then(initIndex('users').then((index)=>{
        initMapping('users').then((mapping)=>{
          var promises = data.map(function(each){
                return addDocument('users',each._doc)
            });
        Promise.all(promises).then(function (data) { 
            console.log('mapping done')
        }).catch((err) => { console.log(err)})
    }).catch((err) => { console.log(err)})
}).catch((err)=>console.log(err)))
}
exports.configureElasticSearch = configureElasticSearch;
