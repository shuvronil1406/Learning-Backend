const express = require('express');
const app = express(); // Create express app instance

const uploadFile = require("./services/storage.services") // Function to upload image to cloud provider
const cors = require("cors")
app.use(cors())  // middleware for CORS (allows frontend to call backend API from different origin)

// const postModel = require("../src/models/post.model")

// app.use(express.json()) : this middleware doesn't work for "form data" so it cannot read files.

const multer = require('multer');   // Multer middleware to handle file uploads.
const postModel = require('./models/post.model'); // Mongoose model for post collection

// Multer setup: store uploaded file in RAM as Buffer
const upload = multer({storage: multer.memoryStorage()})
// memoryStorage():
// - Stores file in RAM as req.file.buffer
// - Doesn't create a file on the server
// - Useful for uploading directly to Cloudinary/S3 or processing the file

// CREATE POST API
app.post("/create-post", upload.single("image"), async (req,res)=>{  
    // upload.single("image"):
    // - Expects one file from form-data with key name "image"
    // - File comes in req.file, text fields come in req.body

    console.log(req.body) // Debug: shows caption or other text fields
    console.log(req.file) // Debug: shows uploaded file metadata + buffer

    // Upload image buffer to cloud provider (ImageKit in your case)
    const result = await uploadFile(req.file.buffer)

    // Save post data in MongoDB
    const post = await postModel.create({
        image : result.url,       // Save hosted image URL from cloud response
        caption : req.body.caption // Save caption from form-data
    })

    // Send success response
    return res.status(201).json({
        message : "Post created",
        post
    })
})

// FETCH ALL POSTS API
app.get("/posts", async (req,res)=> {
    const post = await postModel.find() // Get all posts from DB
    
    return res.status(200).json({
        message: "Posts Fetched Successfully",
        post
    })
})

module.exports = app // Export app to use in server.js