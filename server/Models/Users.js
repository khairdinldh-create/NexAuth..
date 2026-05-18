const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        default:'user'
    }
});

module.exports=mongoose.model('Users',UserSchema);