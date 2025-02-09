import connectDb from "../../../../middleware/mongoose";
import Blog from "../../../../models/blog";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    await connectDb();

    // ✅ Fix: Await `context.params` before using `slug`
    const { params } = await context;
    if (!params?.slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const slug = decodeURIComponent(params.slug); // Fix encoding issues
    console.log("Fetching blog with slug:", slug);

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // ✅ Fix: Await `cookies()` before reading data
    const cookieStore = await cookies();
    const sessionViewedBlogs = (cookieStore.get("viewedBlogs")?.value || "");
    const viewedBlogs = sessionViewedBlogs.split(",");

    if (!viewedBlogs.includes(slug)) {
      viewedBlogs.push(slug);
      const newViewedBlogs = encodeURIComponent(viewedBlogs.join(","));

      // ✅ Increment Views in DB
      blog.views = (blog.views || 0) + 1;
      await blog.save();

      const response = NextResponse.json(
        { ...blog.toObject(), views: blog.views },
        { status: 200 }
      );
      response.headers.set("Set-Cookie", `viewedBlogs=${newViewedBlogs}; Path=/; HttpOnly; SameSite=Strict`);
      return response;
    }

    return NextResponse.json({ ...blog.toObject(), views: blog.views }, { status: 200 });

  } catch (error) {
    console.error("🚨 Error fetching blog:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function POST(req, context) {
  await connectDb();

  try {
    const { params } = context;
    if (!params || !params.slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const { slug } = params;
    let blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    console.log("Before update:", blog.likes);
    blog.likes = (blog.likes || 0) + 1;  // Ensure likes field exists
    await blog.save();
    console.log("After update:", blog.likes);

    return NextResponse.json({ success: true, likes: blog.likes }, { status: 200 });
  } catch (error) {
    console.error("🚨 Error liking blog:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
