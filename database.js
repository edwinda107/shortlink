var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://127.0.0.1:27017/nodedb', { useNewUrlParser: true },function (err, db) {
    if (err) throw err;
    console.log('Tao thanh cong database');
    var dbo = db.db("mydb"); 
    /*dbo.createCollection("customers",function(err,res){
        if (err) throw(err); 
        console.log("Tao thanh cong collection") ;  
        db.close();
    }) ;*/
    var manyobj = [
        {name : "a" , age : "16"} ,
        {name : "khanhhuyen" , age : "17"} ,
        {name : "quocanh" , age : "17"} ,
        {name : "quocchi" , age : "17"} ,
        {name : "dung" , age : "17"} ,
        {name : "tandat" , age : "17"} ,
        {name : "thanhdat" , age : "17"} ,
        {name : "xuanhoang" , age : "17"} ,
        {name : "sinhhung" , age : "17"} ,
        {name : "conghung" , age : "17"} ,
       // { _id : 156, name: "deptrai" /*, age : '17'*/} //,
        //{ _id : 15 , name : "hung" , age : "17"}  
    ] ; 
    var obj = {name : "QuocHung" , age : "17"}
    dbo.collection("customers").insertMany(manyobj,function(err,res){
        if (err) throw err ;
      //  console.log(res) ; 
    }) ;
    var  query = {name  : "khanhhuyen" } ;
    var customsort = { _id : 1 }
    var del = {name : "ngockhanhhuyen"} 


    /*dbo.collection("customers").find(query,{projection : { name : 1 , age : 1 }}).sort(customsort).toArray(function(err,res){
        if (err) throw err ; 
        console.log(res.age) ; 
        db.close() ; 
    });*/
    mongoClient.connect('mongodb://127.0.0.1:27017/nodedb', { useNewUrlParser: true },  function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").findOne(query, function(err, result) {
          if (err) throw err;
          console.log(result.name);
          db.close();
        });
      });
    /*dbo.collection("customers").deleteMany(del,function(err,obj){
        if (err) throw err ; 
        console.log(obj.result.n) ; 
        db.close() ; 
    });
    */
    /*query = {name : "quocchi"} ; 
    var newvalue  = { $set : {name : "doquocchi"}}
    dbo.collection("customers").updateMany(query,newvalue,function(err,res){
        if (err) throw err ;
        console.log("1 obj was updated !") ;
        db.close() ; 
    }) ; */
    /*query, {projection : {name : 1, age : 1 }}*/
   dbo.collection("customers").find({}).toArray(function(err,res){
        if (err) throw(err) ; 
        console.log(res) ; 
        db.close() ; 
    });
   /*dbo.dropCollection("customers",function(err,delOK){
        if (err) throw err ; 
        if (delOK) console.log("Collection Deleted !") ;
        db.close(); 
    });*/
    
});