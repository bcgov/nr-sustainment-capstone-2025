import { Response, Request } from 'express';
import {PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

/**
 * @summary Add report is the main adding report page and from there
 *          we can add other reports ie - addSurfaceCoverageReport 
 */ 
const addReport = (req: Request, res: Response) => {
  console.log(req);
  res.status(200).send('Add report is working');
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
      email: 'test@test.com',
      name: 'test'
    }
  });

  console.log(testAdd);

  // find test
  const testFind = await prisma.user.findMany({
    where: {
      email: 'test@test.com',
      name: 'test'
    }
  });

  console.log(testFind);

  // delete test
  const testDelete = await prisma.user.delete({
    where: {
      email: 'test@test.com',
      name: 'test'
    }
  });

  console.log(testDelete);


  res.status(200).send('this is a test');
}

export {addReport, test};
