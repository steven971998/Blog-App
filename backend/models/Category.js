const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    },{timestamps:true} //It will show created at and updated at time.
); 

module.exports= mongoose.model("Category",CategorySchema)