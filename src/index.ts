import { connectDatabase } from './db';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

// Connect to the Postgres DB
connectDatabase().then(() => {
        const port = process.env.APP_PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log('Something went wrong while establishing the connection with database', error);
    });