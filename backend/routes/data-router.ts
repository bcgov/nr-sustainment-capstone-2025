import express from 'express';
import {addReport, test} from '../controllers/report-controller';

const router = express.Router();

router.route('/add-report').get(addReport);
router.route('/test').get(test);

export default router;
