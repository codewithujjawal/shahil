const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    title:{type:String, required:true,unique: true},
    link:{type:String, required:true,unique: true},

},{timestamps:true});

mongoose.models = {}
export default mongoose.model("Shop",ShopSchema);