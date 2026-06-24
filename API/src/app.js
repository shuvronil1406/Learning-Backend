//this is where, server is created.
const express = require("express")
const app = express() //create instance of express package

app.use(express.json())  //middleware to convert the raw data coming into the body to json format.

const notes = []

app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.status(201).json({
        message : "note created succesfully"
    })
})

//fetching data using api

app.get("/notes",(req,res)=>{
    res.status(200).json({
        message : "NoTe Fetched Succsesfully",
        notes: notes
    })
    
})

app.delete('/notes/:index',(req,res)=>{
    const index = req.params.index
    delete notes[index]
    res.status(200).json({
        message: "Note deleted successfully"
    })

})

app.patch("/notes/:index",(req,res)=>{
    const index = req.params.index
    const description = req.body.description
    const title = req.body.title
    notes[index].description = description
    notes[index].title = title

    res.status(200).json({
        message: "note updated successfully"
    })
})

module.exports = app
