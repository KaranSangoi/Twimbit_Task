const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register user

router.post("/", async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        //validation

        if (!email || !password || !confirmPassword) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        if (password.length < 6) {
            return res.status(400).json({
                errorMessage: "Please enter password of minimum length 6.",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                errorMessage: "Please enter the same password twice.",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                errorMessage: "Account with this email already exists.",
            });
        }

        //Hashing of password

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //save a new user account to DB

        const newUser = new User({
            email, passwordHash
        });

        const savedUser = await newUser.save();

        //sign the token

        const token = jwt.sign(
            {
                user: savedUser._id
            },
            process.env.JWT_SECRET
        );

        //send the token in a HTTP only cookie

        res.cookie("token", token, {
            httpOnly: true,
        }).send();


    } catch (error) {
        console.log(error);
        res.send(500).send();
    }

});

//login user 

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //validate

        if (!email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res
                .status(401)
                .json({ errorMessage: "Wrong email or password." });
        }

        const correctpassword = await bcrypt.compare(
            password,
            existingUser.passwordHash
        );
        if (!correctpassword) {
            return res
                .status(401)
                .json({ errorMessage: "Wrong email or password." });
        }

        //sign the token

        const token = jwt.sign(
            {
                user: existingUser._id
            },
            process.env.JWT_SECRET
        );

        //send the token in a HTTP only cookie

        res.cookie("token", token, {
            httpOnly: true,
        }).send();

    } catch (error) {
        console.log(error);
        res.send(500).send();
    }
});

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
});

router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);
    } catch (error) {
        res.json(false);
    }
});


module.exports = router;