//"use strict" ; 
var express = require("express") ; 
var app = express() ; 
var view = require("consolidate") ; 
var path = require("path") ; 
app.use(function(req,res,next){
    res.render = function render(filename,params){
    var file = path.resolve(__dirname+"/view",filename) ; 
    view.mustache(file, params || {}, function(err,html){
        if (err) {
            //return next(err)  ; 
            thow(err) ; 
        }
        res.writeHeader({"Content-Type" : "text/html"}) ; 
        res.write(html) ; 
        //res.write("cc") ;   
        res.end() ; 
    }); 
};
    next() ; 
    }); 
app.get("/",function(req,res){
    res.render("home.html",{name : "QuocHung"}) ;   
}); 
app.listen("8080") ; 