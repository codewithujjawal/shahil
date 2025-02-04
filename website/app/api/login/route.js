import Account from "../../../models/accounts";
import connectDb from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export async function POST(req) {
  try {
    // Connect to the database
    await connectDb();

    // Extract email and password from the request body
    const { userName, email, password } = await req.json();

    // Find the user in the database
    const user = await Account.findOne({ userName });
    console.log(
      "Stored Encrypted Password: ",
      user ? user.password : "User not found"
    );

    // Check if the user exists
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Decrypt the stored password
    var email = CryptoJS.AES.decrypt(user.email, "shahilsharma").toString(
      CryptoJS.enc.Utf8
    );
    var password = CryptoJS.AES.decrypt(user.password, "shahilsharma").toString(
      CryptoJS.enc.Utf8
    );

    // Check if the passwords match
    if (email !== email && password !== password) {
      console.log("Passwords do not match!");
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // If successful, return the success message and user details (optional)
    var token = jwt.sign(
      {
        data: {
          userName: userName,
        },
      },
      "shahilsharma",
      { expiresIn: "15d" }
    );
    return new Response(
      JSON.stringify({
        success: "Login successful",
        user: {
          name: CryptoJS.AES.decrypt(user.name, "shahilsharma").toString(
            CryptoJS.enc.Utf8
          ),
        },
        token: token,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
