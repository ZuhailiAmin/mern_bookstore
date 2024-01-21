import express, { response } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

// Middleware for parsing the request body
app.use(express.json());

// Using a middleware to handle CORS policy
app.use(cors()); // this allows all origins with default of CORS

// How do we allow custom origins?
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('This is my first MERN project hehe')
});

app.use('/books', booksRoute);

// Connecting to mongoDB
mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('App is connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    })
