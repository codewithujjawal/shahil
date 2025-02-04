import Blog from "../../../models/blog";
import connectDb from "../../../middleware/mongoose";

export async function GET() {
  try {
    await connectDb();
    const blogs = await Blog.find();

    // If no blogs are found
    if (!blogs.length) {
      return new Response(
        JSON.stringify({ message: "No blogs found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ blogs }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch blogs" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
