import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user not exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    // Match password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
