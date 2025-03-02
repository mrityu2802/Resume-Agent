import express from "express";
import cors from "cors";
import { config } from "./config";
import resumeRoutes from "./routes/resume.routes";

const app = express();

app.use(
  cors({
    origin: config.allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/resume", resumeRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
