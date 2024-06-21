import User from "@/models/User";
import connect from "../../../utils/database"
import { NextResponse } from "next/server";

export const POST = async(request:any) => {
    const {name, email, password} = await request.json();

    await connect()

    const existingUser = await User.findOne({email}).select("id") 

    if(existingUser){
        return new NextResponse("email exists, try anoher one", {status: 400})
    }

    const newUser = new User ({
        name,
        email,
        password
    })

    try{
        await newUser.save()
        return new NextResponse("new user addes to the database", {status:200})
    } catch (error: any){
        console.log(error)
        return new NextResponse(error, {
            status:500
        })
    }
}