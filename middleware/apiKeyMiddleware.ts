import { Request, Response, NextFunction } from "express";
import { config } from "../config";

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["api-key"];

  if (!apiKey || apiKey !== config.apiKey) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  next();
};

export default apiKeyMiddleware;
