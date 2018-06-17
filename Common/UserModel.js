const mongoose = require('mongoose')
const Schema  = mongoose.Schema
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
const UserModel = () => {
    return {
        firstName:String,
        lastName:String,
        photo:String,
        mobile:String,
        email:String,
        address:String,
        city:String,
        coordinates:{
            latitude:number,
            longitude:number
        },
        aboutMe:String,
        interests:[]
    }
}

let  UsersSchema = new Schema(UserModel);

//export our module to use in server.js
let model = mongoose.model('User', UsersSchema,'users');

UsersSchema.statics.bulkInsert = function(models, fn) {
    if (!models || !models.length)
      return fn(null);
  
    var bulk = this.collection.initializeOrderedBulkOp();
    if (!bulk)
      return fn('bulkInsertModels: MongoDb connection is not yet established');
  
    let model;
    for (var i=0; i<models.length; i++) {
      model = models[i];
      bulk.insert(model.toJSON());
    }
    bulk.execute(fn);
  }

module.exports = {UsersSchema:UsersSchema,userModel:model }