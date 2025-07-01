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
      noteId: addData.note,
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
      noteId: addData.note,
      hue: addData.hue,
      value: addData.value,
      chroma: addData.chroma,
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
const addSoilPenetrationReport = async (req: Request, res: Response) => {
  const addData = req.body;

  let depthData = [];

  if (!Array.isArray(addData.depths)) {
    return res.status(400).send('Invalid depths data. Ensure it is an array.');
  }

  for (let i = 0; i < addData.depths.length; i++) {
    depthData.push(parseFloat(addData.depths[i]));
  }
  
  const soilPenetrationReport = await prisma.soilPenetrationReport.create({
    data: {
      userId: addData.user,
      createdAt: new Date(addData.date),
      depths: depthData
    }
  });
  res.status(200).send('Add report is working');
}


/**
 * @summary   - addNote adds a note to the database. You will need to pass
 *              a userId and a note to create a note. Notes are an optional
 *              part of reports
 * @param req -
 * @param res -
 */
const addNote =async (req: Request, res: Response) => {

  const addData = req.body;
  const addNote = await prisma.note.create({
    data: {
      note: addData.note,
      userId: addData.userId
    }
  });
  res.status(200).send(addNote);
}

/**
 * @summary     Test is just as it says a test page. For now it is just
 *              for now it is just a blank page and the logs will only 
 *              show up in the compiler. It is just testing to see if CRUD
 *              commands are working with the database
 * @param req   a request being sent to this api endpoint
 * @param res   the response being sent by this api endpoint
 */

const test = async (req: Request, res: Response)=> {
  // add test
  const testAdd = await prisma.user.create({
    data: {
      name: 'test'
    }
  });

  console.log(testAdd);

  // find test
  const testFind = await prisma.user.findMany({
    where: {
      name: 'test'
    }
  });

  console.log(testFind);

  // delete test
  const testDelete = await prisma.user.delete({
    where: {
      name: 'test'
    }
  });

  console.log(testDelete);

  res.status(200).send('this is a test');
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



const checkUsersTable = async (req: Request, res: Response)=> {
  const findUsers = await prisma.user.findMany();
  res.status(200).send(findUsers)
}

const checkCoverageTable = async (req: Request, res: Response)=> {
  const findReports = await prisma.coverageReport.findMany({
    orderBy: {createdAt: 'desc'}
  });
  res.status(200).send(findReports);
}

const checkOMATable = async (req: Request, res: Response)=> {
  const findReports = await prisma.oMAReport.findMany({
    orderBy: {createdAt: 'desc'}
  });
  res.status(200).send(findReports);
}

const checkSoilPenetrationTable = async (req: Request, res: Response)=> {
  const findReports = await prisma.soilPenetrationReport.findMany({
    orderBy: {createdAt: 'desc'}
  });
  res.status(200).send(findReports);
}

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

const filterOMATable = async (req: Request, res: Response)=> {
  const findReports = await prisma.oMAReport.findMany({
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

const checkNotesTable = async (req: Request, res: Response)=> {
  const findNotes = await prisma.note.findMany();
  res.status(200).send(findNotes)
}

export {addCoverageReport, addOMAReport, addSoilPenetrationReport, addNote, test, addingUser, checkUsersTable, checkSoilPenetrationTable, checkCoverageTable, checkOMATable, checkNotesTable, filterCoverageTable, filterOMATable};

