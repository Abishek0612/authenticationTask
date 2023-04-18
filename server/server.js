import express from "express";
import dbConnect  from "./config/dbConnect.js";
import userRoutes from "./routes/usersRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'
//db connection
dbConnect()

const PORT = process.env.PORT || 7000;

const app =express()

//pass incoming data
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/users', userRoutes)




app.listen(PORT, console.log(`server is up and running on port ${PORT}`));
