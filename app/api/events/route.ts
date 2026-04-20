import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        await dbConnect()
        const formData = await req.formData()
        let event

        try{
            event = Object.fromEntries(formData.entries())
        }catch (e){
            return NextResponse.json({message:'Invalid Json data format'})
        }
    }catch (e){
        console.log(e)
        return NextResponse.json({message: 'Event Creation failed', error: e instanceof Error? e.message :'unknown'})
    }
    
}