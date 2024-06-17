import User from "@/models/User";
import connect from "../../../utils/database"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

export const POST = async(request:any) => {
    const {name, email, password} = await request.json();

    await connect()

    const existingUser = await User.findOne({email}) 

    if(existingUser){
        return new NextResponse("email exists, try anoher one", {status: 400})
    }

    // const hashedPassword = await bcrypt.hash(password, 5)

    const newUser = new User ({
        name,
        email,
        password
    })

    try{
        await newUser.save()
        return new NextResponse("new user addes to the database", {status:200})
    } catch (error: any){
        return new NextResponse(error, {
            status:500
        })
    }
}