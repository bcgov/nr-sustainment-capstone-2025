import express from 'express';
import {addCoverageReport, test, testingUser} from '../controllers/report-controller';

const router = express.Router();

router.route('/add-coverage-report').post(addCoverageReport);
router.route('/test-user').get(testingUser);
router.route('/test').get(test);

export default router;
