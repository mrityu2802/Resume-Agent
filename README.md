
# Resume Analysis Assistant
## Overview
Resume Analysis Assistant is an AI-powered tool that provides instant insights into resumes, helping job seekers, professionals, and recruiters enhance their resumes with smart analysis and AI-driven feedback.

## Architecture & Technologies Used
The project follows a client-server architecture:

- Frontend: Built with Next.js, ensuring a fast, SEO-friendly, and scalable user interface.
- Backend: Developed using Node.js and Express.js, providing efficient API handling.
- AI Integration: Powered by Groq, enabling advanced resume analysis and feedback generation.
- Hosting:
  - Frontend deployed on Vercel for seamless performance.
  - Backend hosted on Render (Note: Free instances may have a startup delay of 50+ seconds after inactivity).

## Setup Instructions
### Prerequisites
Ensure you have the following installed:

- Node.js (v16+)
- npm or yarn
- Git

### Clone the Repository
```bash
git clone https://github.com/mrityu2802/Resume-Agent
cd Resume-Agent
```
### Backend Setup
- Navigate to the backend directory:
```bash
cd backend
```
- Install dependencies:
```bash
npm install
```
- Create a .env file and configure your API keys (GROQ_API_KEY, ALLOWED_ORIGINS, PORT).
- Start the backend server:
```bash
npm start
```
### Frontend Setup
- Navigate to the frontend directory:
```bash
cd frontend
```
- Install dependencies:
```bash
npm install
```
- Create a .env file and configure your API keys (NEXT_PUBLIC_API_URL = http://localhost:5000/api)
- Start the development server:
```bash
npm run dev
```
- Open your browser and go to:
```bash
http://localhost:3000
```
### Usage
- Upload your resume securely (data is not stored).
- Get instant AI-powered feedback and improvement suggestions.
- Optimize your resume based on detailed insights.

### Deployed Link

https://resume-agent-five.vercel.app/