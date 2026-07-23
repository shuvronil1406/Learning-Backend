const mongoose = require("mongoose") // Import mongoose to connect Node.js with MongoDB

// Function to connect our app with MongoDB database
async function connectDB(){
    // Connect using the MongoDB URI stored in .env file
    await mongoose.connect(process.env.MONGO_DB_URI)

    // If connection is successful, this line will run
    console.log("Connected to DB")
}

// Export this function so we can call it from server.js/app.js
module.exports = connectDB