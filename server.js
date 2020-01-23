var express = require("express");
var path = require("path");
var fs = require ("fs");


var app = express();
var PORT = process.env.PORT || 3000;

var newnote= [];

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "notes.html"))
});

app.post("/notes", function (req, res){
   var addnote= req.body;
   console.log(addnote);

   newnote.push(addnote);

   res.json(addnote);

})

app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT);
});