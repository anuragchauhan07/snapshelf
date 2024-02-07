import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {

    const {  resImageURL, resTitle  } = await req.json(); 
    const { userId } = auth();
    if (!resImageURL || !resTitle) {
      return new NextResponse("Title required", { status: 400 });
    }
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log(resImageURL, resTitle, userId)
    const post = await db.post.create({
      data: {
        imageUrl: resImageURL,
        userId: userId,
        title: resTitle
      },
    });

    return NextResponse.json(post, { status: 200 }); 
  } catch (error) {
    console.log("[POST TODO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
