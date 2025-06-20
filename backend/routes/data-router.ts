import express from 'express';
import {addCoverageReport, addNote, checkCoverageTable, checkUsersTable, test, addingUser} from '../controllers/report-controller';

const router = express.Router();

router.route('/add-coverage-report').post(addCoverageReport);
router.route('/add-note').post(addNote);
router.route('/add-user').post(addingUser);
router.route('/test').get(test);
router.route('/check-users').get(checkUsersTable);
router.route('/check-coverage-report').get(checkCoverageTable);

export default router;
