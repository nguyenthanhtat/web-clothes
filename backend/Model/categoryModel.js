const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema(
    {
        title:{type:String,require:true,unique:true},
        image:{type:String,require:true},
        categories:{type:String,require:true},
    },
    {
        timestamps:true
    }
);
module.exports = mongoose.model("Category",CategorySchema)