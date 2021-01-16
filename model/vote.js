const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const voteSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    choice : {
        type:String,
        required:true
    },
    submissionDate:{
        type: Date,
        required:true
    }
});
const Vote = mongoose.model("Vote",voteSchema);
module.exports = Vote;