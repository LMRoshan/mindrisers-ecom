const express = require('express')
const { body, validationResult } = require('express-validator')
const Products = require('../models/Product')
const fetchUser = require('../middleware/FetchUser')
const router = express.Router()

// create Products
router.post('/addProduct', fetchUser, [
    body('name').isLength({ min: 2 }),
    body('description').isLength({ min: 2 }),
    body('price').isNumeric(),
    body('instock').isNumeric()
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.error("Validation Errors:", errors.array());
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        const { name, description, price, instock } = req.body
        let img = req.files.map(e => {
            return e.filename
        })

        const prod = await Products.create({ name, description, price, instock, img, user: req.user.id })
        res.json(prod)

        // const prod = new Products({name, description, price, instock})
        // const savedProd = await prod.save()
        // res.json(savedProd)


    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).send("Server Error")
    }
})


// get Products
router.get('/getProducts', fetchUser, async (req, res) => {
    try {
        const products = await Products.find({user: req.user.id})
        res.json(products)
    } catch (error) {
        return res.status(500).send("Server Error")
    }
})

router.get('/gethomeProducts', fetchUser, async (req, res) => {
    try {
        const products = await Products.find()
        res.json(products)
    } catch (error) {
        return res.status(500).send("Server Error")
    }
})

// Update products
router.put('/updateProduct/:id', fetchUser, async (req, res) => {
    const { name, description, price, instock } = req.body

    try {
        const newProd = {}
        if (name) newProd.name = name
        if (description) newProd.description = description
        if (price) newProd.price = price
        if (instock) newProd.instock = instock

        let product = await Products.findById(req.params.id)
        if (!product) return res.status(404).send("Product not found")

        if (!product.user || product.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        product = await Products.findByIdAndUpdate(req.params.id, { $set: newProd }, { new: true })
        res.json({ success: true, product })
    } catch (error) {
        return res.status(500).send("Server Error")
    }
    // try {
    //     const product = await Products.findOneAndUpdate({name}, {name, description, price, instock}, {new: true})
    //     res.json(product)
    // } catch (error) {
    //     return res.status(500).send("Server Error")
    // }
})


// delete Products
router.delete('/deleteProduct/:id', fetchUser, async (req, res) => {
    try {
        let product = await Products.findById(req.params.id)
        if (!product) return res.status(404).send("Product not found")

        if (!product.user || product.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        product = await Products.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Product has been deleted", product })
    } catch (error) {
        return res.status(500).send("Server Error")
    }
})

module.exports = router