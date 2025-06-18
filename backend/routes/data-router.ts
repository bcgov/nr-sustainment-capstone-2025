import express from 'express';
import {addCoverageReport, addLabel, checkCoverageTable, checkUsersTable, checkLabelsTable, test, addingUser, pullLabels} from '../controllers/report-controller';

const router = express.Router();

router.route('/add-coverage-report').post(addCoverageReport);
router.route('/add-label').post(addLabel);
router.route('/add-user').post(addingUser);
router.route('/test').get(test);
router.route('/check-users').get(checkUsersTable);
router.route('/check-coverage-report').get(checkCoverageTable);
router.route('/check-label').get(checkLabelsTable);
router.route('/pull-labels').post(pullLabels);

export default router;
