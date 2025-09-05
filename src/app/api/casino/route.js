import { Gamelist } from "@/lib/model/gamelist";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {

    connectToDb();
    
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const response = await Gamelist.find({type:type});
    return NextResponse.json(response);
  } catch (err) {
    console.error("Error fetching game list:", err); // Log the entire error object
    throw new Error("Failed to fetch Gamelist!");
  }
};

export const POST = async (req, res) => {
  try {
      await connectToDb()   
      const body = await req.json()
      console.log("saving to db:", body);
      const newStudent = await Gamelist.create(body)
      return NextResponse.json({data:newStudent}, {status:201})
  } catch (error) {
      return NextResponse.json({data: null}, {status:500})
  }
}


