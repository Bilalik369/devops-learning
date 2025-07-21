import mongoose from "mongoose";


export const connectDB= async()=>{
  try {
   await mongoose.connect(process.env.MONGODB_URI)
    console.log("base des donner connect succssefly")
  } catch (error) {
    console.log("error to conncting ")
    process.exit(1)
  }
   
}