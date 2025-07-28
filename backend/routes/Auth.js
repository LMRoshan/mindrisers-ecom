const express = require('express')
const User = require('../models/User')
// const Products = require('../models/Product')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const router = express.Router()
const fetchUser = require('../middleware/FetchUser')

const JWT_SECRET = "hello"

router.post('/createUser', [
    body('name').isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    console.log('Received ', req.body);


    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            console.log('User already exists:', req.body.email);
            return res.status(400).json({ message: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const secPassword = await bcrypt.hash(req.body.password, salt)

        console.log('Creating user with:', { // Add this line
            name: req.body.name,
            email: req.body.email,
            password: 'hashed'
        });

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        })

        console.log('User created successfully:', user._id);

        const data = {
            user: {
                id: user._id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)

        res.json({ success: true, user, authToken })
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send("Server Error")
    }
})


router.post(
    "/login",
    [
        body("email").isEmail(),
        body("password").isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success: false, errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({success: false, error: "pls regsiter your email first" });
            }
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return res.status(400).json({success: false, error: "password doesn't match" });
            }
            const data = {
                user: {
                    id: user._id,
                },
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({success: true, user, authToken });
        } catch (error) {
            console.error(error);
            res.status(500).send("internal server error");
        }
    }
);


// getUser
router.get('/getUser', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.send(user)
    } catch (error) {
        return res.status(500).send("Server Error")
    }
})


module.exports = router