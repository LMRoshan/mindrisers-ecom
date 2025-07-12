const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    instock: {
        type: Number,
        required: true
    },
    img: {
        type: [String],
        required: false

    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Products = mongoose.model("products", ProductSchema)

module.exports = Products