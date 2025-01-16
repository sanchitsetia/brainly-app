import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const protectRoutes =  (req: Request, res: Response, next: NextFunction): any=> {  
  try {
    const token = req.cookies.token;
    console.log("token",token)
    const validToken = jwt.verify(token, process.env.JWT_SECRET!);
    if(!validToken){
      return res.status(401).json({
        error: "Unauthorized"
      });
    }
    // @ts-ignore
    req.userid = validToken.userid;
    next();
  } catch (error) {
    console.log("error while verifying token",error);
    res.status(500).json({
      error: "Internal server error"
    });
  }

};