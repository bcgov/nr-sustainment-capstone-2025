import { Response, Request } from 'express';

const checkHealth = (req: Request, res: Response) => {
  res.status(200).send('SAT API is healthy and ready!');
};

export default checkHealth;