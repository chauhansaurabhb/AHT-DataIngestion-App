import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.json());

// Connect to the Postgres DB
createConnection().then(() => {
    console.log('Connected to the database');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});