import { Router } from 'express';
import { postTelemetryData } from '../controllers/telemetry.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// POST /telemetry
router.post('/telemetry', authenticate, postTelemetryData);

export default router;