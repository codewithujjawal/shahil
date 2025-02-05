import connectDb from "../../../../middleware/mongoose";
import Blog from "../../../../models/blog";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDb();

  try {
    const { slug } = params;

    // Find blog by slug
    let blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
