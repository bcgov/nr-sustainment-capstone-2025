import express from 'express';
import {addCoverageReport, addOMAReport, addNote, checkCoverageTable, checkOMATable, checkUsersTable, test, addingUser, checkNotesTable, filterCoverageTable, filterOMATable} from '../controllers/report-controller';
import {dummyCovRprtData, dummyNotes, dummyUsers, populateDatabase} from '../controllers/test-controller';

const router = express.Router();

router.route('/add-coverage-report').post(addCoverageReport);
router.route('/add-note').post(addNote);
router.route('/add-user').post(addingUser);

router.route('/check-users').get(checkUsersTable);
router.route('/check-coverage-report').get(checkCoverageTable);
router.route('/check-notes').get(checkNotesTable);

router.route('/check-coverage-report').post(filterCoverageTable);

router.route('/test').get(test);
router.route('/populate').get(populateDatabase);
router.route('/dummy-cov-rpt').get(dummyCovRprtData);
router.route('/dummy-users').get(dummyUsers);
router.route('/dummy-notes').get(dummyNotes);

router.route('/add-oma-report').post(addOMAReport);
router.route('/check-oma-report').get(checkOMATable);
router.route('/check-oma-report').post(filterOMATable);

export default router;
