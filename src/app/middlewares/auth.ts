/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import User from "../module/user/user.model";

const auth = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(401, "You are not authorized.");
      }
      let decode;
      try {
        decode = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
      } catch (err) {
        throw new AppError(401, "You are not authorized.Update your token.");
      }
  
      const role = decode.role;
  
      if (!requiredRoles.includes(role)) {
        throw new AppError(401, "You are not authorized.It is not your role.");
      }
      const user = await User.findOne({ _id: decode._id || decode.id });
      if (!user) {
        throw new AppError(401, "User is not found!");
      }
  
      req.user = decode;
      next();
    });
  };
  
  
  

export default auth;