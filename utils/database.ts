import mongoose, {ConnectOptions} from "mongoose";

let isConnected:boolean = false

const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if(isConnected){
        console.log('Mondo db is connected')
        return
    } 

    try{
        await mongoose.connect(
            process.env.MONGODB_URI!,{
            }
        )
    } catch(error){
        console.log(error)
    };

}

export default connectToDB