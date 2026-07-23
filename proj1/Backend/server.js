require("dotenv").config() // Load environment variables from .env file into process.env

const app = require("./src/app") // Import express app (routes + middlewares)
const connectDB  = require("./src/db/db") // Import DB connection function

connectDB() // Connect backend to MongoDB before handling requests

// Start server on port 3000
app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})