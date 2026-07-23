// this is where we define the schema of the database
const mongoose = require("mongoose") // Import mongoose to create schema and model

// Schema = structure/rules of each post document
const postSchema = new mongoose.Schema({
    image : String,   // Stores uploaded image URL/path
    caption : String  // Stores text caption written by user
})

// Create model from schema
// Model is used to perform DB operations (save, find, delete, etc.)
const postModel = mongoose.model("post", postSchema)  
/* "post" denotes the collection inside the database "project-1" where data of each post will be stored.*/

module.exports = postModel // Export model so routes/controllers can use it