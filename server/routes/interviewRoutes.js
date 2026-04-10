import express from 'express';
import Interview from '../models/Interview.js';

const router = express.Router();

import { getInterview } from '../controllers/Interview/getInterview.js';
import { getInterviews } from '../controllers/Interview/getInterviews.js';
import { addInterview } from '../controllers/Interview/addInterview.js';
import { deleteInterview } from '../controllers/Interview/deleteInterview.js';
import { updateInterview } from '../controllers/Interview/updateInterview.js';
import { updateInterviewByCandidate } from '../controllers/Interview/updateInterviewByCandidate.js';

router.get('/all-interviews', getInterviews);
router.get('/interview/:id', getInterview);
router.post('/add-interview', addInterview);
router.delete('/delete-interview/:id', deleteInterview);
router.put('/update-interview/:id', updateInterview);
router.put('/update-interview-by-candidate/', updateInterviewByCandidate);

export default router;    