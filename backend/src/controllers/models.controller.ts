import { Request, Response } from "express";
import { models } from "../config";

export class ModelsController {
  async getModels(req: Request, res: Response) {
    try {
      res.json(models);
    } catch (error) {
      console.error("Error fetching models:", error);
      res.status(500).json({ error: "Failed to fetch models" });
    }
  }
}
