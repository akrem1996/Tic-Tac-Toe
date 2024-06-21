import User from "@/models/User";
import connect from "../../../utils/database"
import { NextResponse } from "next/server";


export const POST = async(request:any) => {
    try{
        let isPasswordCorrect= false;
        const {email, password} = await request.json();
        await connect()
        
        const existingUser = await User.findOne({email})


        if(!existingUser){
            return new NextResponse("user don't exists, you should create an account", {status: 400})
        }
 
        if(existingUser.password == password){
            isPasswordCorrect = true;
        }

        if (!isPasswordCorrect) {
            console.log('Invalid password')
            return new NextResponse('Invalid password', {status:401})
        }

        console.log('Login successful')
        return new NextResponse('Login successful', {status:200})
    } catch (error: any){
        return new NextResponse(error, {
            status:500
        })
    }
}
