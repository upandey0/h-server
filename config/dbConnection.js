import mongoose from "mongoose";

const dbConnection = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to Database`);
    } catch(e){
        console.log(e.message);
        process.exit(1);
    }
}

export default dbConnection;