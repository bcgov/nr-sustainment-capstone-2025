import { Response, Request } from 'express';

/**
 * @summary Add report is the main adding report page and from there
 *          we can add other reports ie - addSurfaceCoverageReport 
 */ 
const addReport = (req: Request, res: Response) => {
  res.status(200).send('Add report is working');
};

export {addReport};
