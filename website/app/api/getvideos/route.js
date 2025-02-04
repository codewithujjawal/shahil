import Video from "../../../models/video";
import connectDb from "../../../middleware/mongoose";

export async function GET() {
  try {
    await connectDb();
    const videos = await Video.find();

    // If no videos are found
    if (!videos.length) {
      return new Response(
        JSON.stringify({ message: "No videos found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ videos }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching videos:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch videos" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
