import express, {Request, Response} from "express";
import { connectDB, ContentModel, LinkModel, UserModel } from "./db";
import {z} from "zod";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { protectRoutes } from "./middleware";
import cookieParser from "cookie-parser";
import { random } from "./utilts";
import cors from "cors"
dotenv.config();



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))



app.post("/api/v1/signup", async (req:Request, res:Response):Promise<any> => {
  try {
    const {username, password} = req.body;
    const userNameValidation = z.string().min(3).max(10).safeParse(username);
    const passwordValidation = z.string().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).safeParse(password);

    if (!userNameValidation.success || !passwordValidation.success) {
      console.log(userNameValidation.error, passwordValidation.error);
      return res.status(400).json({
        error: "Invalid username or password"
      });
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        username,
        password: hashedPassword
      })
      user.save();
      const token = jwt.sign({"userid": user._id}, process.env.JWT_SECRET!, {expiresIn: "3d"});

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000
      });

      return res.status(200).json({
        message: "User created successfully"
      })
    }
  } catch (error) {
    console.log("error while signup",error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
})

app.post("/api/v1/signin", async (req:Request, res:Response):Promise<any> => {
  try {
    const {username, password} = req.body;
    const foundUser = await UserModel.findOne({username});
    if (!foundUser) {
      return res.status(401).json({
        error: "User not found"
      });
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password!);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid password"
      });
    }
    const token = jwt.sign({"userid": foundUser._id}, process.env.JWT_SECRET!, {expiresIn: "3d"});
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
      message: "User logged in successfully"
    })
  } catch (error) {
    console.log("error while login",error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
})

app.post("/api/v1/content",protectRoutes, async (req:Request, res:Response):Promise<any> => {
  try {
    const {title, link, type, tags} = req.body;
    // @ts-ignore
    const userId = req.userid;
    await ContentModel.create({title, link, type, tags, userId});
    return res.status(200).json({
      message: "Content created successfully"
    })
  } catch (error) {
    console.log("error while creating content",error);
    res.status(500).json({
      error: "Internal server error"
    })
  }
})

app.get("/api/v1/content",protectRoutes, async (req:Request, res:Response):Promise<any> => {
  try {
    const contents = await ContentModel.find().populate("tags").populate("userId", "username");
    return res.status(200).json({
      contents
    })
  } catch (error) {
    console.log("error while getting content",error);
    res.status(500).json({
      error: "Internal server error"
    })
  }
})

app.delete("/api/v1/content/:id", protectRoutes, async (req:Request, res:Response):Promise<any> => {
  try {
    const {id} = req.params;
    await ContentModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Content deleted successfully"
    })
  } catch (error) {
    console.log("error while deleting content",error);
    res.status(500).json({
      error: "Internal server error"
    })
  }
})

app.post("/api/v1/share", protectRoutes,async (req,res)=>{
  try {
    const share = req.body.share;
      //@ts-ignore
      const userId = req.userid
    if(share)
    {
      const existingLink = await LinkModel.findOne({userId})
      const link = "/share/"
      if(existingLink)
      {
        res.status(200).json({"link":`${link}${existingLink.hash}`});
      }
      else
      {
        const createdHash = random(10)
        console.log("userId",userId)
        await LinkModel.create({
          hash:createdHash,
          userId
        })
        res.status(200).json({"link":`${link}${createdHash}`});
      }
    }
    else
    {
      await LinkModel.findOneAndDelete({userId})
      res.status(200).json({"message":"share setting removed successfully"});
    }
    
  } catch (error) {
    console.log("error while toggling content share",error);
    res.status(500).json({"error":"Internal Server Error"});
  }
})

app.get("/api/v1/share/:shareId",async (req,res)=>{
  try {
    const hash = req.params.shareId
    const foundLink = await LinkModel.findOne({hash})
    console.log("foundLink",foundLink);
    if(foundLink)
    {
      const sharedContent = await ContentModel.find({userId:foundLink.userId}).populate("userId","username");
      res.status(200).json({sharedContent});
    }
    else
    {
      res.status(400).json({"error":"share link not valid"})
    }
  } catch (error) {
    console.log("error while getting the shared content",error);
    res.status(500).json({"error":"Internal Server Error"});
  }
})



app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectDB();
});

