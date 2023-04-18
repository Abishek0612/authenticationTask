
import mongoose from "mongoose";

const dbConnect = async() => {
    try{
        const connected = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb connected `)
    }catch(error){
        console.log(`Error : ${error.message}`)
        process.exit(1);
    }   
}

export default dbConnect;


//kjShPaAg9UHTvxnS
// 49.37.209.29/32