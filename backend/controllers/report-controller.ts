import { Response, Request } from 'express';
import { PrismaClient } from "@prisma/client";
import { error } from 'console';

const prisma = new PrismaClient();

/**
 * @summary - addSurfaceCoverageReport will add to the coverage_report
 *            table using information sent from the soil coverage page.
 *            user ids are found by looking up the name sent in the 
 *            request body on the user table
 * @param req - the incoming request 
 * @param res - the outgoing response
 */ 
const addCoverageReport = async (req: Request, res: Response) => {
  const addData = req.body;

  const user = await prisma.user.findUnique({
    where: {
      name: addData.user
    },
    select: {
      id: true,
    },
  });

  if(user){
    const coverageReport = await prisma.coverage_Report.create({
      data: {
        userId: user.id,
        coverage_picture: addData.img,
        coverage_percentage: addData.num
      }
    });
  
    res.status(200).send('Add report is working');
  } else {
    res.status(401).send('error this user doesnt exist');
  }
};


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
  const findUser = await prisma.user.findMany({
    where: {
      name: addUser.userName
    }
  });

  if(findUser.length == 0){
    // add user to the database
    const userAdd = await prisma.user.create({
      data: {
        name: addUser.userName
      }
    });
    res.status(200).send("User created")
  } else {
    res.status(401).send("Already have user in database")
  }
  console.log(findUser);
}



const checkUsersTable = async (req: Request, res: Response)=> {
  const findUsers = await prisma.user.findMany();
  console.log(findUsers);
  res.status(200).send("table in console")
}

const checkCoverageTable = async (req: Request, res: Response)=> {
  const findReports = await prisma.coverage_Report.findMany();
  console.log(findReports);
  //console.log(findReports.coverage_picture.toString('utf-8'));
  res.status(200).send("table in console");
}


export {addCoverageReport, test, addingUser, checkUsersTable, checkCoverageTable};
