import Blog from "@/models/blog";
import connectDb from "@/middleware/mongoose";

// const handler = async(req,res) =>{
//     let blogs = await Blog.find()
//     res.status(200).json({blogs})
    
// }
// export default connectDb(handler)

export async function GET() {
    try {
      await connectDb();
      const blogs = await Blog.find();
  
      return new Response(JSON.stringify({ blogs }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
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