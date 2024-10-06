import { connect } from "@/config/config";
import InvestorAccount from "@/models/investor_account";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        // Parse request body to JSON
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Retrieve user account from database based on email
        const account = await InvestorAccount.findOne({ email });

        // If account not found, return error response
        if (!account) return NextResponse.json({ error: "User does not exist." }, { status: 400 });

        // Compare provided password with hashed password stored in database
        const validPassword = await bcryptjs.compare(password, account.password);

        // If password is invalid, return error response
        if (!validPassword) return NextResponse.json({ error: "Invalid Password" }, { status: 409 });

        // Generate JWT token with user data
        const tokenData = {
            id: account._id,
            username: account.username,
            email: account.email
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" } );

        // Create success response
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        }, { status: 200 });

        // Set token in HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response; // Return success response with token
    } catch (error: any) {
        // Return error response if an exception occurs
        return NextResponse.json({error: error.message}, {status: 500});
    }
};