import 'dotenv/config';
import express from 'express';
import './db/index.js'
import authRouter from './router/AuthRouter.js';
import { errorHandler, NotFound } from './middlewares/errorMiddlewares.js';

const app = express();
const port = 3000;
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', authRouter)


app.use(errorHandler)
app.use(NotFound);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
