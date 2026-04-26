import express, { json } from 'express';
import 'dotenv/config';
import chatRoutes from './routes/chatRoutes.js'

const app = express();
app.disable("x-powered-by");
app.use(json());

app.use('/api', chatRoutes);

app.listen(4000, () => console.log('Server running on port 4000'));