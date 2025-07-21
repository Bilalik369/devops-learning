import mongoose  from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    nom : {
        type : String, 
        required : true, 
        trim : true,
    }, 
    email : {
        type : String, 
        required : true,
        unique : true ,
    },
    password : {
        type : String, 
        required: true,

    },
})

userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    try {
        const salt= await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password ,salt)
        next()
    } catch (error) {
        next(error)
    }
})
userSchema.methods.generateToken =  function () {
return jwt.sign({id : this._id},process.env.SECRET_JWT)
    
}

userSchema.methods.comparePassword =async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword , this.password)
}
export default mongoose.model("User" , userSchema);