import express from 'express';
import cors from 'cors';

const app = express();
// for parsing requests
app.use(express.json());

app.use(cors());

// export app
export { app };
