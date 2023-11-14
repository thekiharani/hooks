import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

export const createApp = (): express.Application => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    const PORT = (process.env.PORT || 4001) as number;
    const HOST = process.env.HOST || '0.0.0.0';
    app.listen(PORT, HOST, () => {
        logger.info(`Server is running on port http://${HOST}:${PORT}`);
    });

    return app;
};

export default createApp;