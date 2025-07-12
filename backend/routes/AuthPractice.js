const express = require('express')
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const Products = require('../models/Product')
const jwt = require('jsonwebtoken')
const becrypt = require('bcryptjs')
const fetchUser = require('../middleware/FetchUser')
const JWT_SECRET = "hAllo"

const router = express.Router()

router.post('/createUser', [
    body('name').isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {

        const newUser = await User.findOne({ email: req.body.email })
        if (newUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const salt = await becrypt.genSalt(10)
        const hashedPassword = await becrypt.hash(req.body.password, salt)

        newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        const data = {
            user: {
                id: newUser._id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)

        res.json({ newUser })

    } catch (error) {
        return res.status(500).send("Server Error")
    }
})


// login
router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            return res.staus(400).json({message: "User not found"})
        }

        const confirmPassword = await becrypt.compare(req.body.password, user.password)
        if(!confirmPassword) {
            return res.status(400).json({message: "Password doesn't match"})
        }

        const data = {
            user: {
                id: user._id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)

        res.json({user, authToken})
    } catch (error) {
       return res.status(500).send("Server Error")
    }
})


const FetchUser = async (req, res,next) => {
    const token = await req.header("authToken")
    if(!token) {
        return res.status(401).json({message: "Please authenticate using a valid token"})
    }

    try {

        const data = jwt.verify(token, JWT_SECRET)
        req.body = data.user
        next()
        
    } catch (error) {
        return res.staus(401).json({message: "Please authenticate using a valid token"})
    }

}

router.get('/getUser', FetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.body.id).select('-password')
        res.json({user})
    } catch (error) {
        return res.status(500).send("Server Error")
    }
})


router.post('/addProd', fetchUser, [
    body('name').isLength({ min: 2 }),
    body('description').isLength({ min: 2 }),
    body('price').isNumeric(),
    body('instock').isNumeric()
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const {name, description, price, instock} = req.body

        const prod = await Products.create({name, description, price, instock})
        res.json(prod)
    } catch (error) {
        return res.status(500).send("Server Error")
    }
})

router.get('getProd', fetchUser, async(req, res) => {
    try {
        const prod = await Products.find({})
        res.json(prod)
    } catch (error) {
        return res.status(500).send("Server Error")
    }
})

router.post('/addProd', fetchUser, async(req, res) => {
    const {name, description, price, instock} = req.body
    try {

        const product = await Products.create({name, description, price, instock, user:req.user.id})
        res.json(product)
        
    } catch (error) {
        return res.status(500).send("Server Error")
    }
})


router.put('updateProd/:id', fetchUser, async(req, res) => {
    const {name, description, price, instock} = req.body
    try {

        const prod = await Products.findById(req.params.id)

        const newProd = {}
        if(name) newProd.name = name
        if(description) newProd.description = description
        if(price) newProd.price = price
        if(instock) newProd.instock = instock

        if (!prod) {
            return res.status(404).send("Product not found")
        }

        if (!prod.user || producr.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        prod = await Products.findByIdAndUpdate(req.params.id, {$set: newProd}, {new: true})
        res.json(prod)

        
    } catch (error) {
        return res.status(500).send("Server Error")
    }
})


router.delete('delProd/:id', fetchUser, async(req, res) => {
    try {
        const prod = await Products.findById(req.params.id)
        if (!prod) {
            return res.status(404).send("Product not found")
        }

        if (!prod.user || producr.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        const product = await Products.findByIdAndDelete(req.params.id)
        res.send({message: "Product has been deleted", product})
    } catch (error) {
        return res.status(500).send("Server Error")
    }
})

module.exports = router