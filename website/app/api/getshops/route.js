import Shop from "../../../models/shop";
import connectDb from "../../../middleware/mongoose";

export async function GET() {
    try {
      await connectDb();
      const shops = await Shop.find();
  
      return new Response(JSON.stringify({ shops }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching shops:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch shops" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }