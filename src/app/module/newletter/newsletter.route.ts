import express from 'express';
import { getSubscriber, subscribeNewsletter } from './newsletter.controller';
const router = express.Router();

router.post('/subscribe', subscribeNewsletter);
router.get('/subscribers', getSubscriber);

export default router;
export const NewsletterRoutes = router;