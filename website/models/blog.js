import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
