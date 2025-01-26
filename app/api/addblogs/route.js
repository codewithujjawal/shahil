import Blog from "@/models/blog";
import connectDb from "@/middleware/mongoose";

// POST method handler
export async function POST(req) {
  try {
    await connectDb();
    const blogs = await req.json(); // Parse incoming request body

    for (let i = 0; i < blogs.length; i++) {
      const blog = new Blog({
        title: blogs[i].title,
        description: blogs[i].description,
        content: blogs[i].content,
      });
      await blog.save();
    }

    return new Response(
      JSON.stringify({ success: "Blogs saved successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error saving blogs:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save blogs" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}