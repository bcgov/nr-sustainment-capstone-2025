import app from './express';

const port = 3000;

app.listen(port, () => {
  console.info(`[server]: Server started on port ${port}`);
});