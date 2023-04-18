
import mongoose from "mongoose";

const dbConnect = async() => {
    try{
        const connected = await mongoose.connect("mongodb://0.0.0.0:27017/authentication")
        console.log(`Mongodb connected `)
    }catch(error){
        console.log(`Error : ${error.message}`)
        process.exit(1);
    }   
}

export default dbConnect;