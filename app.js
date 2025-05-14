import express from "express";
import {
    generateKeypair,
    generateRandomKeypair
} from "./src/controller/controller.js";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post('/generate-keypair', generateKeypair);
app.post('/generate-random-keypair', generateRandomKeypair);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

