import { Request, Response, Application } from "express";
import createApp from "./app";

const app: Application = createApp();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to Noria Payments API!',
        status: 'Connected',
        timestamp: new Date().toUTCString(),
        ip: req.ip,
    });
});