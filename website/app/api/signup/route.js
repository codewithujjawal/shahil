import Account from "../../../models/accounts";
import connectDb from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");

// POST method handler
export async function POST(req) {
  try {
    await connectDb();
    const user = await req.json(); // Parse incoming request body

      const account = new Account({
        name: CryptoJS.AES.encrypt(user.name, 'shahilsharma').toString(),
        userName: user.userName,
        email: CryptoJS.AES.encrypt(user.email, 'shahilsharma').toString(),
        password: CryptoJS.AES.encrypt(user.password, 'shahilsharma').toString(),
      });
      console.log(account);
      // 
      await account.save();

    return new Response(
      JSON.stringify({ success: "user saved successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error saving user:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save user" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}