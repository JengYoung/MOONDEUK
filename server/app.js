import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index.js'
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import jwtCheck from './middleware/jwtCheck.js';

const app = express();

const { PORT, MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(e => {
        console.error(e);
    })

app.use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(jwtCheck)
    .use('/routes', routes)
    // .use('/', (req, res) => res.send('Hello, Node!'))
    .listen(PORT || 4000, () => {
    console.log(`Listening To ${PORT || 4000}...`);
})
