// we are currently using imagekit as our cloud service provider, but the csp may change in future.
// So we write the corresponding code related to external services in a separate "services folder".
// refer to this doc: https://github.com/imagekit-developer/imagekit-nodejs

const ImageKit = require("@imagekit/nodejs") // Import ImageKit SDK

// Create ImageKit client object using private key from .env
const imagekit = new ImageKit({
    privateKey : process.env.IMAGE_KIT_PRIVATE_KEY
})

// Reusable function to upload one file buffer to ImageKit
async function uploadFile(buffer){
    // Call ImageKit upload API
    const result = await imagekit.files.upload({
        file : buffer.toString("base64"), // Convert binary buffer to base64 string (required format)
        fileName : "image.jpg"            // Name that will be stored in cloud
    
    })

    return result; // Return full response (url, fileId, name, etc.)
                  // so caller can use required fields
}

module.exports = uploadFile; // Export function for use in controllers/routes