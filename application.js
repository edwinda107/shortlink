var express = require("express") ;
var app = express() ;
var fs = require("fs") ;
var shortid = require("shortid") ; 

var mongoClient = require("mongodb").MongoClient ; 
mongoClient.connect("mongodb://127.0.0.1:27017/nodedb",{useNewUrlParser : true},function(err,db){
    if (err) throw(err) ; 
    console.log("Connect to database !  ") ; 
    var dbo = db.db("linkDatabase") ; 
    dbo.createCollection("link",function(err,res){
        if (err) throw err  ; 
        console.log("Create collection successful !") ; 
    });
}) ;
app.get("/",function(req,res){
        fs.readFile("view/home.html",function(err,data){
        if (err) throw(err) ;
            res.writeHead("200",{"Content-Type" : "text/html"}) ;
            res.write(data) ;
            res.end() ;
    }) ;
});
app.get("/send",function(req,res){
    var data = req.query.linkInput ;
    console.log(data) ; 
    var id = shortid.generate() ;
    console.log(id) ; 
    var dataSend = {root : data , si : id} ; 
    
    mongoClient.connect("mongodb://127.0.0.1:27017/nodedb",{useNewUrlParser : true},function(err,db){   
        var dbo = db.db("linkDatabase") ; 
        dbo.collection("link").insertOne(dataSend,function(err,res){
            if (err) throw err; 
            console.log("1 link da duoc add vao database");
        });
   });
   resToClient = "http://localhost:8080/" + id ; 
 
   res.end(resToClient) ;
}) ;


app.get("/:id",function(req,res){
    mongoClient.connect("mongodb://127.0.0.1:27017/nodedb",{useNewUrlParser : true},function(err,db){
        if (err) throw(err) ; 
        var idd = req.params.id ; 
        var dbo = db.db("linkDatabase") ; 
        var query = {"si" : idd} ;
        res.writeHead("200",{"Content-type" : "text/html"}) ; 
        dbo.collection("link").findOne(query, function(err, result) {
              if (err) throw err;
              res.write(result.root) ; 
              res.end("<br> <a href="+result.root+">Open link in newtab</a>");
              db.close();
              
        }) ; 

    });
});
app.listen(8080) ;