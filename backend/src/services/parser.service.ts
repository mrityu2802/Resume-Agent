import pdf from 'pdf-parse';
import * as fs from 'fs';
import mammoth from 'mammoth';

export class ParserService {
  async parseResume(file: Express.Multer.File): Promise<string> {
    try {
      const fileType = file.mimetype;
      let text = '';

      switch (fileType) {
        case 'application/pdf':
          text = await this.parsePdf(file.buffer);
          break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          text = await this.parseDocx(file.buffer);
          break;
        default:
          throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
      }

      // Clean and normalize the extracted text
      return this.normalizeText(text);
    } catch (error) {
      console.error('Error parsing resume:', error);
      throw new Error('Failed to parse resume file');
    }
  }

  private async parsePdf(buffer: Buffer): Promise<string> {
    try {
      const data = await pdf(buffer);
      return data.text;
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw new Error('Failed to parse PDF file');
    }
  }

  private async parseDocx(buffer: Buffer): Promise<string> {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (error) {
      console.error('Error parsing DOCX:', error);
      throw new Error('Failed to parse DOCX file');
    }
  }

  private normalizeText(text: string): string {
    return text
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Remove excessive newlines
      .replace(/\n+/g, '\n')
      // Remove special characters
      .replace(/[^\w\s\n.,;:?!-]/g, '')
      // Trim whitespace
      .trim();
  }
} 