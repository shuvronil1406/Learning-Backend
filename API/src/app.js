//this is where, server is created.
const express = require("express")
const app = express() //create instance of express package

app.use(express.json())

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
        message : "Node Fetched Succsesfully",
        notes: notes
    })
    
})


module.exports = app
