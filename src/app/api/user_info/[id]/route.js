import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const id = params.id;

  try {
    connectToDb();
   
    const selectFields = {
      mobile: 1,
      user_id: 1,
      email: 1,
      phone: 1,
      currency: 1,
      first_name: 1,
      last_name: 1,
      agent_id: 1,
      refferer: 1,
      role_as: 1,
      address: 1,
      country: 1,
      country_currency: 1,
      city: 1,
      exposure: 1,
    };

    const result = await User.findById(id).select(selectFields);
    return NextResponse.json(result);
    
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch User!");
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    connectToDb();

    await User.deleteOne({ id });
    return NextResponse.json("User deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete User!");
  }
};
