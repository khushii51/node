import express from 'express';
import {config} from "dotenv";
import cors from "cors";
import { dbConnection } from './database/dbConnection.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
config({ path: './config/config.env'});

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
dbConnection();

app.use((req,res) =>{
    res.status(404).json({
        success: false,
        message:`Route ${req.originalUrl} not found`
    });
});

export default app;