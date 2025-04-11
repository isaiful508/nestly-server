import express, { Application } from 'express';

import cors from 'cors';
import router from './app/routes';
const app: Application = express();

app.use(cors ({
  origin : ["http://localhost:5173",],
   credentials : true
}))
app.use(express.json());
app.use('/api', router);
app.get('/', (req, res) => {
  console.log('Hello World!');
  res.send('Hello!');
});


export default app;
