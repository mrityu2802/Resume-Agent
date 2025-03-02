import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller';

const router = Router();
const chatController = new ChatController();

router.post('/', (req, res) => {
  chatController.chat(req, res);
});

export default router;