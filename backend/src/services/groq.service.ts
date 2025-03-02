import Groq from 'groq-sdk';

export class GroqService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });
  }

  async analyzeResume(resumeText: string) {
    const prompt = `
      As an expert resume reviewer and career coach, analyze the following resume and provide:
      1. A list of key skills identified
      2. A brief summary of their experience
      3. 3-4 specific career trajectory recommendations
      4. 3-4 areas for improvement in the resume
      
      Format the response as JSON with the following structure:
      {
        "skills": string[],
        "experience": string,
        "recommendations": string[],
        "improvements": string[]
      }

      Resume text:
      ${resumeText}
    `;

    const completion = await this.groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'mixtral-8x7b-32768',
    });

    return JSON.parse(completion.choices[0].message.content as string);
  }
}
