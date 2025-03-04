import express from "express";
import cors from "cors";
import { config } from "./config";
import resumeRoutes from "./routes/resume.routes";
import chatRoutes from './routes/chat.routes';
import modelsRoutes from './routes/model.routes';

const app = express();

app.use(
  cors({
    origin: config.allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/resume", resumeRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/models', modelsRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
