import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"

dotenv.config();




const app = express();
const PORT  = process.env.PORT

app.use(express.json());

app.get("/", (req, res) => {
    res.send("404.js is the best!");
  });

app.use('/api/auth', authRoutes);

connectDB()
app.listen(PORT , ()=>{
console.log(`server is running in the PORT ${PORT}`)
})