import { Router } from 'express';
import travelRouter from './travel';

const router = Router();

router.use('/', travelRouter);

export default router;
