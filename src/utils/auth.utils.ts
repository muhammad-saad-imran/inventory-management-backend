import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UnauthorizedError from "../Errors/UnauthorizedError";

export async function encrypt(data: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(data, salt);
}

export async function compareHash(data: string, hash: string) {
  return bcrypt.compare(data, hash);
}

export function createToken(data: any) {
  return jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "24h" });
}

export function verifyToken(token: string): jwt.JwtPayload {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
  } catch (error) {
    throw new UnauthorizedError("Invalid authorization token");
  }
}
