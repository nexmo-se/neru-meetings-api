import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";
import path from 'path';
import st from 'serve-static';
import { fileURLToPath } from 'url';

import { router as meetingsRouter } from './routes/index.js';

var __dirname = path.dirname(fileURLToPath(import.meta.url));

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * Frontend resources
 */
app.use('/public/static/', st(path.join(__dirname, './public/static/')));
app.use('/public/manifest.json', st(path.join(__dirname, './public/manifest.json')));
app.get('/public/*', function(req, res, next) {
    res.sendFile('index.html', {root: path.join(__dirname, './public')});
});

/**
 * APIs
 */
app.use('/meetings', meetingsRouter);

export default app;