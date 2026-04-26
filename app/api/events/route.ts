import  {Event}  from "@/database";
import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { IEvent } from "@/database/event.model";


export async function POST(req:NextRequest) {
    let uploadedPublicId: string | null = null; // Track this for cleanup

    try {
        await dbConnect();
        const formData = await req.formData();
        const eventData = Object.fromEntries(formData.entries());

        const file = formData.get('image') as File;
        if (!file || !file.type.startsWith('image/')) {
            return NextResponse.json({ message: 'Valid image file is required' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload Logic
        const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: 'DevEvent' },
                (error, result) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error("Cloudinary upload failed"));
                    resolve(result);
                }
            ).end(buffer);
        });

        uploadedPublicId = uploadResult.public_id; // Store ID for potential cleanup

        const finalEvent: Partial<IEvent> = {
            ...eventData,
            image: {
                secure_url: uploadResult.secure_url,
                public_id: uploadResult.public_id
            }
        };

        const createdEvent = await Event.create(finalEvent);
        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });

    } catch (e) {
        console.error("Error:", e);

        // Cleanup: If we uploaded an image but the DB failed, delete the image
        if (uploadedPublicId) {
            await cloudinary.uploader.destroy(uploadedPublicId);
        }

        return NextResponse.json({ 
            message: 'Event Creation failed', 
            error: e instanceof Error ? e.message : 'unknown' 
        }, { status: 500 });
    }
}