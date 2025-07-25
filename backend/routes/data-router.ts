import express from 'express';
import {addCoverageReport, addOMAReport, checkCoverageTable, checkOMATable, checkUsersTable, addingUser, filterCoverageTable, filterOMATable, checkSoilPenetrationTable, addSoilPenetrationReport, filterSoilPenetrationTable} from '../controllers/report-controller';
import {dummyCovRprtData, dummyOMARprtData, dummySoilPenetrationRprtData, dummyUsers, populateDatabase} from '../controllers/test-controller';

const router = express.Router();

// these endpoints are for adding data to the database
router.route('/add-coverage-report').post(addCoverageReport);
router.route('/add-user').post(addingUser);
router.route('/add-oma-report').post(addOMAReport);
router.route('/add-soil-penetration-report').post(addSoilPenetrationReport);

// these endpoints are for selecting all data from a certain table
router.route('/check-users').get(checkUsersTable);
router.route('/check-coverage-report').get(checkCoverageTable);
router.route('/check-oma-report').get(checkOMATable);
router.route('/check-soil-penetration-report').get(checkSoilPenetrationTable);

// these endpoints are for selecting certain data from certain tables
router.route('/check-coverage-report').post(filterCoverageTable);
router.route('/check-oma-report').post(filterOMATable);
router.route('/check-soil-penetration-report').post(filterSoilPenetrationTable);

// these endpoints are for adding testing data
router.route('/populate').get(populateDatabase);
router.route('/dummy-cov-rpt').get(dummyCovRprtData);
router.route('/dummy-users').get(dummyUsers);
router.route('/dummy-oma-rpt').get(dummyOMARprtData);
router.route('/dummy-soil-penetration-rpt').get(dummySoilPenetrationRprtData);

export default router;
