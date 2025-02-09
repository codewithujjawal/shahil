const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    name:{type:String, required:true},
    userName:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},

},{timestamps:true});

mongoose.models = {}
export default mongoose.model("Account",AccountSchema);