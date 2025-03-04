import { Router } from "express";
import { ModelsController } from "../controllers/models.controller";

const router = Router();
const modelsController = new ModelsController();

router.get("/", modelsController.getModels);

export default router;
