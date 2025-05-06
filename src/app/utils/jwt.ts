import jwt from "jsonwebtoken";

export const signJwtToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};