import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const contentType = ["youtube", "twitter"];

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
});

const contentSchema = new mongoose.Schema({
  title: String,
  link: String,
  type: {
    type: String,
    enum: contentType,
    required: true
  },
  tags: [{type:mongoose.Schema.Types.ObjectId, ref:"Tags"}],
  userId: [{type:mongoose.Schema.Types.ObjectId, ref:"User", required: true}],
})

const TagsSchema = new mongoose.Schema({
  title: String
})

const LinkSchema = new mongoose.Schema({
  hash: {type: String,required: true},
  userId: {type:mongoose.Schema.Types.ObjectId, ref:"User",required:true}
})

export const UserModel = mongoose.model("User", userSchema);
export const ContentModel = mongoose.model("Content", contentSchema);
export const TagsModel = mongoose.model("Tags", TagsSchema);
export const LinkModel = mongoose.model("Link", LinkSchema);

export const connectDB = async () => {
  
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("Connected to MongoDB");
}
