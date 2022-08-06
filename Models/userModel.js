const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    tokens:[
        {
            token:{
                type:String,
                expiresIn:'15d'
            }
        }
    ],
    
},{timestamps:true})

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET, {
        expiresIn:'15d'
    })
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}

const User = mongoose.model('User',userSchema)

module.exports = User