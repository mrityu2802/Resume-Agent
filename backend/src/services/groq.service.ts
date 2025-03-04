import Groq from "groq-sdk";
import { TEMPERATURE, MAX_TOKENS } from "../config";
export class GroqService {
  private groq: Groq;
  private temperature: number;
  private maxTokens: number;

  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
    this.temperature = TEMPERATURE;
    this.maxTokens = MAX_TOKENS;
  }

  async analyzeResume(resumeText: string, model: string) {
    try {
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
        messages: [{ role: "user", content: prompt }],
        model: model,
        temperature: this.temperature,
        max_tokens: this.maxTokens,
      });
      const response = completion.choices[0].message.content;

      return JSON.parse(
        response?.replace(/^```json\n/, "").replace(/\n```$/, "") || "{}"
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {
        skills: [],
        experience: "",
      };
    }
  }

  async chat(message: string, analysis: any, model: string) {
    try {
      const systemPrompt = `You are an expert career advisor and resume reviewer.
        ### **Current Resume Context**
        - **Skills:** ${analysis.skills.join(", ")}
        - **Experience Summary:** ${analysis.experience}

        ### **Your Task**
        Provide specific, actionable advice based on this context, focusing on:
        1. **Resume Improvements** – Suggestions for structure, clarity, and impact.
        2. **Career Guidance** – Personalized career path recommendations.
        3. **Skill Development** – Areas for improvement and learning resources.
        4. **Industry Insights** – Trends and best practices relevant to the user’s domain.
        5. **Job Search Strategies** – Effective ways to find and secure job opportunities.

        ### **Response Guidelines**
        - **If the user asks a specific question (e.g., "What is my name?"), answer only with the direct response** without additional details.
        - **If the question is about resume improvement or career advice, use the provided resume context.**
        - **Do not add extra sections or formatting when responding to simple direct queries.**
        - **If the user asks a question about their resume, use the provided resume context.**
        - **add proper spacing and line breaks in the response.**
        - **Use **markdown formatting** when necessary for clarity and bullet points.**

        ### **Examples of Expected Behavior:**
        **User:** "What is my name?"  
        **Response:** "Mrityunjay Kumar Mishra" (No extra details)

        **User:** "How can I improve my resume?"  
        **Response:** "- Organize your skills into categories... (full advice based on context)"

        **User:** "What are my top skills?"  
        **Response:** "JavaScript, React.js, Node.js, TypeScript, MongoDB, MySQL"  (No extra details)

        `;

      const completion = await this.groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        model: model,
        temperature: this.temperature,
        max_tokens: this.maxTokens,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error("Error in chat:", error);
      return "An error occurred while processing your request.";
    }
  }
}
