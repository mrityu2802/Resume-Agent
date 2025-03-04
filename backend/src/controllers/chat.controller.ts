import { Request, Response } from 'express';
import { GroqService } from '../services/groq.service';

export class ChatController {
  private groqService: GroqService;

  constructor() {
    this.groqService = new GroqService();
  }

  async chat(req: Request, res: Response) {
    try {
      const { message, analysis, model } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const response = await this.groqService.chat(message, analysis, model);
      
      return res.json({ response });
    } catch (error) {
      console.error('Chat error:', error);
      return res.status(500).json({ error: 'Failed to process chat message' });
    }
  }
}