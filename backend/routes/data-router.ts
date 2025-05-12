import express from 'express';
import {addReport} from '../controllers/report-controller';

const router = express.Router();

router.route('/add-report').get(addReport);

export default router;
