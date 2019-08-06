var express = require("express"); //equivalent à import
var app = express();

app.get("/" , function(req,res,next){
	res.setHeader('Content-Type', 'text/html'); //type "MIME" de la réponse
	res.write("<html><body>hello world</body></html>");
	res.end();
});

app.listen(8282 , function () {
console.log("http://localhost:8282");
});

//node server.js


