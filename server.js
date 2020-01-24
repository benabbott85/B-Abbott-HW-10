var express = require("express");
var path = require("path");
var fs = require ("fs");
var util= require("util");


var app = express();
var PORT = process.env.PORT || 3000;

// var newnote= [];
var noteid= [];

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"))
    getnotes();
});

app.get("/api/notes", function (req, res){
    res.sendFile(path.join(__dirname, "notes.html"))
});

app.post("/api/notes", function (req, res){
   var addnote= req.body;
   console.log(addnote);

   newnote.push(addnote);

   res.json(addnote);

});

app.delete("/api/notes/:id", function (req, res){
    user.delete(req.params.id)
    .then (() => {
        var response = {message: "Note has been deleted!", state: true};
        return res.json(response)

        
    });

    // res.sendFile("Deleting note id:")// figure out how to inject note id that has been created... empty array???
});

class Store {
    constructor (){
        this.id= 0;

    }

    appread(){
       var readfile = util.promisify(fs.readFile)
    return readFile("db.json", "utf8")

        
    }

    appwrite(){
        var writeFile = util.promisify(fs.writeFile)
        return writeFile("db.json", JSON.stringify(note));
    }

    appdelete(id){
        return this.getnotes()
        .then (notes => notes.filter(note => note.id !== parseInt(id)))
        .then (filternotes => this.appwrite(filternotes));
        
    }

    getnotes(){
        return this.appread()
        .then (notes => {
            var parsenotes;
            try {
                parsenotes = [].concat (JSON.parse(notes))
            } catch (err){
                parsenotes = [];
            }
            return parsenotes;
        })
        

        }

        addnotes(note){
            const {title, text} = note;
            if (!title || !text){
                throw new Error("Note needs to have a title and text!")
            }
            const newnote = {title, text, id: ++this.id}
            return this.getnotes()
            .then (notes => [...notes, newnote])
            .then(updatednotes => this.appwrite(updatednotes))
            .then (()=> newnote);
        }
    }



app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT);
});

