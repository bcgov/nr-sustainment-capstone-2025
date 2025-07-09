import { Response, Request } from 'express';
import { PrismaClient } from "@prisma/client";
import { error } from 'console';

const prisma = new PrismaClient();

/**
 * @summary - addCoverageReport will add to the coverage_report
 *            table using information sent from the soil coverage page.
 *            user ids are found by looking up the name sent in the 
 *            request body on the user table
 * @param req - the incoming request 
 * @param res - the outgoing response
 */ 
const addCoverageReport = async (req: Request, res: Response) => {
  const addData = req.body;

  const coverageReport = await prisma.coverageReport.create({
    data: {
      userId: addData.user,
      coverage_picture: addData.img,
      coverage_percentage: addData.num,
    }
  });
  res.status(200).send('Add report is working');
};


/**
 * @summary - addOMAReport will add to the oma_report
 *            table using information sent from the OMA page.
 *            user ids are found by looking up the name sent in the 
 *            request body on the user table
 * @param req - the incoming request 
 * @param res - the outgoing response
 */ 
const addOMAReport = async (req: Request, res: Response) => {
  const addData = req.body;

  const omaReport = await prisma.oMAReport.create({
    data: {
      userId: addData.user,
      hue: addData.hue,
      value: addData.value,
      chroma: addData.chroma,
      moisture_level: addData.moistureLevel 

    }
  });
  res.status(200).send('Add report is working');
};


/**
 * @summary - addSoilPenetrationReport will add to the soil_penetration_report
 *            table using information sent from the Soil Penetration page.
 *            user ids are found by looking up the name sent in the 
 *            request body on the user table
 * @param req - the incoming request 
 * @param res - the outgoing response
 */ 
const addSoilPenetrationReport = async (req: Request, res: Response) => {
  const addData = req.body;
  
  const soilPenetrationReport = await prisma.soilPenetrationReport.create({
    data: {
      userId: addData.user,
      createdAt: new Date(addData.date),
      depths: addData.depths
    }
  });
  res.status(200).send('Add report is working');
}


/**
 * This function will only be used to create a testing User one time
 * After this has been done this endpoint will return in a 400 error
 * This can be deleted as soon as the login page is working correctly
 * @param req 
 * @param res 
 */
const addingUser = async (req: Request, res: Response)=> {
  const addUser = req.body;
  const findUser = await prisma.user.findUnique({
    where: {
      name: addUser.userName.toUpperCase()
    },select : {
      id: true
    }
  });

  if(findUser){
    res.status(200).send(findUser)
  } else {
    // add user to the database
    const userAdd = await prisma.user.create({
      data: {
        name: addUser.userName.toUpperCase()
      }
    });
    res.status(200).send(userAdd)
  };
}


/**
 * @summary   checkUserTable checks to see what is currently
 *            in the Users Table
 * @param req - the incoming request 
 * @param res - the outgoing response
 */ 
const checkUsersTable = async (req: Request, res: Response)=> {
  const findUsers = await prisma.user.findMany();
  res.status(200).send(findUsers)
}


/**
 * @summary   checkCoverageTable checks to see what is currently
 *            in the CoverageReport Table
 * @param req - the incoming request 
 * @param res - the outgoing response
 */ 
const checkCoverageTable = async (req: Request, res: Response)=> {
  const findReports = await prisma.coverageReport.findMany({
    orderBy: {createdAt: 'desc'}
  });
  res.status(200).send(findReports);
}


/**
 * @summary   checkOMATable checks to see what is currently
 *            in the OMAReport Table
 * @param req - the incoming request 
 * @param res - the outgoing response
 */ 
const checkOMATable = async (req: Request, res: Response)=> {
  const findReports = await prisma.oMAReport.findMany({
    orderBy: {createdAt: 'desc'}
  });
  res.status(200).send(findReports);
}


/**
 * @summary   checkSoilPenetrationTable checks to see what is
 *            currently in the SoilPenetrationReport Table
 * @param req - the incoming request 
 * @param res - the outgoing response
 */ 
const checkSoilPenetrationTable = async (req: Request, res: Response)=> {
  const findReports = await prisma.soilPenetrationReport.findMany({
    orderBy: {createdAt: 'desc'}
  });
  res.status(200).send(findReports);
}


/**
 * @summary   filterCoverageTable selects all entries in the
 *            CoverageReport Table that fit the given filter.
 *            The filter is sent through the body of the request
 * @param req - the incoming request 
 * @param res - the outgoing response
 */ 
const filterCoverageTable = async (req: Request, res: Response)=> {
  const findReports = await prisma.coverageReport.findMany({
    where: {
      createdAt: {
        gte: req.body.date
      }
    },
    orderBy: {createdAt: 'desc'}
  });
  console.log(findReports);
  res.status(200).send(findReports);
}


/**
 * @summary   filterOMATable selects all entries in the
 *            OMA Report Table that fit the given filter.
 *            The filter is sent through the body of the request
 * @param req - the incoming request 
 * @param res - the outgoing response
 */ 
const filterOMATable = async (req: Request, res: Response)=> {
  const findReports = await prisma.oMAReport.findMany({
    where: {
      createdAt: {
        gte: req.body.date
      },
      moisture_level: req.body.moistureLevel
    },
    orderBy: {createdAt: 'desc'}
  });
  console.log(findReports);
  res.status(200).send(findReports);
}

export {addCoverageReport, addOMAReport, addSoilPenetrationReport, addingUser, checkUsersTable, checkSoilPenetrationTable, checkCoverageTable, checkOMATable, filterCoverageTable, filterOMATable};

