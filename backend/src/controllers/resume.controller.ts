import { Request, RequestHandler, Response } from "express";
import { GroqService } from "../services/groq.service";
import { ParserService } from "../services/parser.service";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class ResumeController {
  static uploadAndAnalyze(
    arg0: string,
    arg1: RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >,
    uploadAndAnalyze: any
  ) {
    throw new Error("Method not implemented.");
  }
  private groqService: GroqService;
  private parserService: ParserService;

  constructor() {
    this.groqService = new GroqService();
    this.parserService = new ParserService();
  }

  uploadAndAnalyze = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const model = req.body.model;

      const resumeText = await this.parserService.parseResume(req.file);
      const analysis = await this.groqService.analyzeResume(resumeText, model);

      res.json({ success: true, analysis });
    } catch (error) {
      console.error("Error processing resume:", error);
      res.status(500).json({
        success: false,
        analysis: null,
        error: "Failed to process resume",
      });
    }
  };
}
