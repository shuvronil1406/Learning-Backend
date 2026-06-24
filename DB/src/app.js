//where server is created

const express = require ('express');
const app = express();
const noteModel = require("./models/note.model")
require("dotenv").config();
app.use(express.json())   //middleware to perform operations

app.post("/notes",async (req,res)=>{
    const data = req.body;                        //data stores whatever is send through request. 
    await noteModel.create({                             //a note is created in the databse using noteModel
         title: data.title,                             //async-await is used because the data may take time to get updated as per the server.
         description : data.description
    })
    res.status(201).send({message : "Note Created"})
})

app.get("/notes", async (req,res)=>{
    const notes = await noteModel.find()   //find method always returns an array of objects, if no note is present, it will return an empty array.
    res.status(201).send({
        message: "Note fetched successfully",
        notes: notes
    })
})

app.delete("/notes/:id", async (req,res) =>{
    const id = req.params.id
    await noteModel.findOneAndDelete({
        _id : id
    })
    res.status(200).json({
        message : "Note Deleted Successffuly"
    })
})  

app.patch("/notes/:id", async(req,res)=>{
    const id = req.params.id
    const description = req.body.description
    await noteModel.findOneAndUpdate({ _id: id}, {description: description})

    res.status(200).json({
        message: "Note updated successfully"
    })
})

module.exports = app