const mongoose = require("mongoose")
const Mongo_URI =  "mongodb://127.0.0.1:27017/reactjs"

const dbConnect = () => {
    mongoose.connect(Mongo_URI)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err))
}

module.exports = dbConnect

// "mongodb://localhost:27017/reactjs" ||