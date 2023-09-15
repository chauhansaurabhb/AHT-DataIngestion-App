import { Router } from 'express';
import { postTelemetryData } from '../controllers/telemetry.controller';

const router = Router();

// POST /telemetry
router.post('/telemetry', postTelemetryData);

export default router;