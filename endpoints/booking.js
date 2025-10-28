import Express from 'express';
import controller from '../controllers/booking.js'
import { dataSchemes } from '../validations/schemes.js';
import { checkBody } from '../validations/validated.js';

const router = Express.Router();

router.post('/bookings/reserve', checkBody(dataSchemes), controller.bookingFunc)

export default router;