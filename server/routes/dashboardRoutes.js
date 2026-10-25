import express from 'express';
import { getAdminPerformanceStats } from '../controllers/Dashboard/getAdminPerformanceStats.js';
import { getSuperAdminStats } from '../controllers/Dashboard/getSuperAdminStats.js';

const router = express.Router();

router.get('/admin-performance-stats', getAdminPerformanceStats);
router.get('/super-admin-stats', getSuperAdminStats);

export default router;
