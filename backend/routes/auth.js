const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')

// REGISTER USER
router.post('/register',async (req,res)=>{
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        const user = await newUser.save();
        console.log(res.body)
        // res.send(user)
        res.status(200).json(user)
    } catch(err){

        console.log(err)
        res.status(500).json(err)
    }
})


//LOGIN USER

router.post('/login', async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        !user && res.status(400).json("Wrong Credentials.")
    
        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("Wrong Credentials.")

        const {password, ...others}=user._doc; //To not show the password as a response to the user while logging in.
        res.status(200).json(others)
    } 
    catch (err){
        res.status(500).json(err)
    }
})

module.exports = router;