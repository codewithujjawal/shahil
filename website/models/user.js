const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    title:{type:String, required:true},
    link:{type:String, required:true},

},{timestamps:true});

mongoose.models = {}
export default mongoose.model("Video",VideoSchema);