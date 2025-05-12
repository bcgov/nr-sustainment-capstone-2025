import express from 'express';
import {addReport} from '../controllers/report-controller';

const router = express.Router();

router.route('/add').get(addReport);

export default router;
