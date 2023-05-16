const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const app = express()
const dotenv = require("dotenv");
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const path = require('path')

dotenv.config()
app.use(express.json())
app.use('/images', express.static(path.join(__dirname,"/images")))

//To connect to MongoDB Atlas:
mongoose.connect('mongodb+srv://steven:steven123@cluster0.lhfxqbm.mongodb.net/blog?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
     console.log("MongoDB Atlas Connected successfully.")
  }).catch(()=>{
     console.log("Failed to connect.")
  });
 
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/categories',categoryRoute)

//Uploading file or image using Multer.
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name)
        // cb(null,"hello.jpeg")
    }
})

const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded.")
})

app.use('/',(req,res)=>{
    res.send("This is homepage in backend.")
})

app.listen('5000',()=>{
    console.log("Backend running on port 5000.")
    })