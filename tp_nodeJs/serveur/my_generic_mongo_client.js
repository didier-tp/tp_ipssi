//myGenericMongoClient module (with MongoDB/MongoClient)
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

//NB: sans connexion internet le localhost est moins bien géré que
// 127.0.0.1 sur certains ordinateurs (ex: windows 8 , 10 ). 
var mongoDbUrl = 'mongodb://127.0.0.1:27017/test'; //by default
var currentDb=null; //current MongoDB connection

var setMongoDbUrl = function(dbUrl){
	mongoDbUrl = dbUrl;
}

var closeCurrentMongoDBConnection = function(){
	currentDb.close();
	currentDb=null;
}

var executeInMongoDbConnection = function(callback_with_db) {
  if(currentDb==null){
    MongoClient.connect(mongoDbUrl, function(err, /*db en v2*/ client) {
	if(err!=null) {
		console.log("mongoDb connection error = " + err + " for dbUrl=" + mongoDbUrl );
	}
	const db = client.db("test" /*dbname*/); //depuis v3
	assert.equal(null, err);//arret de l'execution ici si err != null
	console.log("Connected correctly to mongodb database" );
	currentDb = db;
	callback_with_db(db);
	});
  }else{
	callback_with_db(currentDb);  //reutilisation de la connection.
  }
}

var genericUpdateOne = function(collectionName,id,changes,callback_with_err_and_results) {
	executeInMongoDbConnection( function(db) {
		db.collection(collectionName).updateOne( { '_id' : id }, { $set : changes } ,
			function(err, results) {
				if(err!=null) {
					console.log("genericUpdateOne error = " + err);
				}
			callback_with_err_and_results(err,results);
			});
		});
};

var genericInsertOne = function(collectionName,newOne,callback_with_err_and_newId) {
	executeInMongoDbConnection( function(db) {
 db.collection(collectionName).insertOne( newOne , function(err, result) {
		if(err!=null) {
			console.log("genericInsertOne error = " + err);
			newId=null;
		}
		else {newId=newOne._id;
		}
		callback_with_err_and_newId(err,newId);
		});
	});
};

var genericFindList = function(collectionName,query,callback_with_err_and_array) {
	executeInMongoDbConnection( function(db) {
		var cursor = db.collection(collectionName).find(query);
		cursor.toArray(function(err, arr) {
			callback_with_err_and_array(err,arr);
		});
   });
};

var genericFindOne = function(collectionName,query, callback_with_err_and_item) {
	executeInMongoDbConnection( function(db) {
		db.collection(collectionName).findOne(query , function(err, item) {
			if(err!=null) {
				console.log("genericFindByOne error = " + err);
		}
		console.log("found item="+JSON.stringify(item));
		callback_with_err_and_item(err,item);
		});
    });
};

var genericDeleteOne = function(collectionName,query, callback_with_err) {
	executeInMongoDbConnection( function(db) {
		db.collection(collectionName).deleteOne(query , function(err) {
			if(err!=null) {
				console.log("genericDeleteOne error = " + err);
		}
		callback_with_err(err);
		});
    });
};


exports.genericUpdateOne = genericUpdateOne;
exports.genericInsertOne = genericInsertOne;
exports.genericFindList = genericFindList;
exports.genericFindOne = genericFindOne;
exports.genericDeleteOne = genericDeleteOne;
exports.setMongoDbUrl= setMongoDbUrl;
exports.closeCurrentMongoDBConnection=closeCurrentMongoDBConnection;