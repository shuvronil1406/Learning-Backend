// here we inform the database about the schema of the data it will store
const mongoose = require("mongoose")
const noteSchema = new mongoose.Schema({
    title : String,
    description : String
})

const noteModel = mongoose.model("note", noteSchema) 
// to perform any operation on the database, we need to create a MOdel.
/* and by operations, it means: 
C -> Create : POST
R -> Read : GET
U -> Update : PATCH
D -> Delete : DELETE
*/

module.exports = noteModel