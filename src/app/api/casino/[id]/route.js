import { Gamelist } from "@/lib/model/gamelist";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const id = params.id;
  try {
    connectToDb();
   // const result = await Gamelist.findById(id);
    const result = await Gamelist.find({type:request.type});
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Gamelist!");
  }
};

//Actualizar un documento
export const PUT = async (request, { params }) => {
  await connectToDb()
  const id = params.id
  const body = await request.json()
  try {
      const result = await Gamelist.findByIdAndUpdate(id, {$set:{...body}}, {new:true})
      if(!result){
          return NextResponse.json( { message: `Document with ID: ${id} not found` }, { status: 404 });
      }
      return NextResponse.json({data:result}, {status:200})
  } catch (error) {
      return NextResponse.json({ data: null }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    connectToDb();

    await Gamelist.deleteOne({ id });
    return NextResponse.json("Gamelist deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete Gamelist!");
  }
};
