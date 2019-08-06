var express = require("express"); //equivalent à import
var app = express();

var listeProduits = [
{ num : 1 , name : "cahier" , price : 2.5 , description : "petit cahier" },
{ num : 2 , name : "stylo" , price : 1.5 , description : "stylo bille" }
];

//http://localhost:8282/products/1 (recherche unique par id/pk)
app.get("/products/:numero" , function(req,res,next){
	let numProd = req.params.numero; //1 ou 2 ou ...
	console.log("numProd="+numProd);
	//à faire en Tp : ne renvoyer que le produit dont .num vaut numProd
	var prod = null;
	for(let p of listeProduits){
			 if(p.num == numProd){
				 prod = p; break;
		        }
		 }
	res.send(prod);
});

//http://localhost:8282/products
//ou bien http://localhost:8282/products?prixMax=2
app.get("/products" , function(req,res,next){
	let prixMaxi = req.query.prixMax;
	console.log("prixMaxi="+prixMaxi);
	if(prixMaxi == null)
	   res.send(listeProduits);
     else {
		 //ne renvoyer que les produits pas trop chers .
		 let listeProduitsPasTropChers = [];
		 for(let p of listeProduits){
			 if(p.price < Number(prixMaxi)){
				 listeProduitsPasTropChers.push(p);
		        }
		 }
	     res.send(listeProduitsPasTropChers);
       }
	/* équivalent à 
	      res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify(listeProduits));
          res.end();*/
});

app.listen(8282 , function () {
console.log("http://localhost:8282/products");
});

//node server.js

//npm install -g nodemon
//nodemon server.js 


