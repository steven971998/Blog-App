const router = require('express').Router();
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt')

// UPDATE USER
router.put('/:id',async (req,res)=>{
    if(req.body.userId === req.params.id){ //checking whether the id given in the params actually exist in the Database.
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new:true});//It will send the updated data as a response.
            res.status(500).json(updatedUser)
        } catch(err){
    
            console.log(err)
            res.status(500).json(err)
        } 
    } 
    else{
        res.status(401).json("You can update only your account.")
    }
})

//DELETE USER   

router.delete('/:id',async (req,res)=>{
    if(req.body.userId === req.params.id){ //checking whether the id given in the params actually exist in the Database.
        
        try{
            const user = await User.findById(req.params.id);

            try{
                await Post.deleteMany({username:user.username}) //Since we are deleting the user, we will delete all the posts of the user.
                await User.findByIdAndDelete(req.params.id) //Deleting the user.
                res.status(200).json("User has been deleted.")
            } catch(err){
        
                console.log(err)
                res.status(500).json(err)
            }     
        }
        catch(err){
            res.status(404).json("User not found.")
        }
    } 
    else{
        res.status(401).json("You can delete only your account.")
    }
})

//GET USER 

router.get('/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,...others}=user._doc;  //To not show the password as a response while fetching the user data.
        res.status(200).json(others)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;