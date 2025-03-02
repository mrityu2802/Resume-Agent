import { Router } from 'express';
import multer from 'multer';
import { ResumeController } from '../controllers/resume.controller';

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

const router = Router();
const resumeController = new ResumeController();

router.post('/upload', upload.single('resume'), (req, res, next) => {
  resumeController.uploadAndAnalyze(req, res).catch(next);
});

export default router;