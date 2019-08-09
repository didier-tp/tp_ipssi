var express = require("express"); //equivalent à import
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;
//importation du fichier de fonctions utilitaires pour travailler avec mongo db:
var myGenericMongoClient = require('./my_generic_mongo_client');

// "catalogue" en debut d'url est ici le nom de l'api rest 
//(paquet de web services)

var app = express();
var jsonParser = bodyParser.json() ;
app.use(jsonParser);
/*
// Exemple : CORS enabled with express/node-js :
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*"); //"*" ou "xy.com , ..."
res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE,OPTIONS"); //default: GET, ...
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept , Authorization");
next();
});
*/


//POST http://localhost:8282/catalogue/private/products 
// with body {  "name" : "gomme" , "price" : 3.5 }
app.post('/catalogue/private/products', function(req , res ) {
var nouveauProduit = req.body ; //as javascript object

myGenericMongoClient.genericInsertOne('products', 	nouveauProduit,
	   (err,newId) => {
         nouveauProduit._id = newId;
         res.send(nouveauProduit); //on renvoie souvent une copie des données postées
                          // avec un id auto incrémenté
	   });
});

//http://localhost:8282/catalogue/private/products/1 (suppression selon id/pk)
app.delete("/catalogue/private/products/:id" , function(req,res,next){
	let idProd = req.params.id; //1 ou 2 ou ...
	console.log("delete avec idProd="+idProd);
	
	myGenericMongoClient.genericDeleteOne('products',
     	{ '_id' : new ObjectId(idProd) },
	   (err) => {
	
		if(err)
		  res.status(404).send(null);	//404 = status HTTP notfound .	
			else
		  res.status(200).send(null);

	   });
	  
});


//http://localhost:8282/catalogue/public/products/1 (recherche unique par id/pk)
app.get("/catalogue/public/products/:id" , function(req,res,next){
	
	let numProd = req.params.id; //"1223" ou "222er" ou  ...
	console.log("get avec numProd="+numProd);
	
	myGenericMongoClient.genericFindOne('products',
     	{ '_id' : new ObjectId(req.params.id) },
	   (err,prodMongo) => {
	
		if(prodMongo==null)
		  res.status(404).send(null);	//404 = status HTTP notfound .	
			else
		res.send(prodMongo);

	   });
});
//http://localhost:8282/catalogue/public/products
//ou bien http://localhost:8282/catalogue/public/products?prixMax=2
//ou bien http://localhost:8282/catalogue/public/products?categorie=papeterie
//ou bien .../products?prixMax=2&categorie=papeterie
app.get("/catalogue/public/products" , function(req,res,next){
	let categorie = req.query.categorie;	console.log("categorie="+categorie);
	let mongoQuery = categorie ? { categorie : categorie } : { } ;
	
	myGenericMongoClient.genericFindList('products',mongoQuery,
	   (err,listeProduitsMongo) => {
	
	let prixMaxi = req.query.prixMax;	console.log("prixMaxi="+prixMaxi);
	if(prixMaxi == null)
	   res.send(/*listeProduits*/ listeProduitsMongo);
     else { //ne renvoyer que les produits pas trop chers .
		 let listeProduitsPasTropChers = [];
		 for(let p of /*listeProduits*/ listeProduitsMongo){
			 if(p.price < Number(prixMaxi)){
				 listeProduitsPasTropChers.push(p);
		        }
		 }
	     res.send(listeProduitsPasTropChers);
       }
	   
	   });
});

app.listen(8282 , function () {
console.log("http://localhost:8282/catalogue/public/products");
});

//node server.js

//npm install -g nodemon
//nodemon server.js 


