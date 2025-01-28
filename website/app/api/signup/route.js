import Account from "../../../models/accounts";
import connectDb from "../../../middleware/mongoose";

// POST method handler
export async function POST(req) {
  try {
    await connectDb();
    const user = await req.json(); // Parse incoming request body

      const account = new Account({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      console.log(account);
      
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