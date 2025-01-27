import Contact from "@/models/contact";
import connectDb from "@/middleware/mongoose";

// POST method handler
export async function POST(req) {
  try {
    await connectDb();
    const conatcts = await req.json(); // Parse incoming request body

    for (let i = 0; i < conatcts.length; i++) {
      const contact = new Contact({
        name: conatcts[i].name,
        message: conatcts[i].message,
      });
      await contact.save();
    }

    return new Response(
      JSON.stringify({ success: "conatcts saved successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error saving conatcts:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save conatcts" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}