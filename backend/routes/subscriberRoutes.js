import express from 'express';
const router = express.Router();
import { subscribeUser } from '../controllers/subscriberController.js';

router.route('/').post(subscribeUser);

export default router;
