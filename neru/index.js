import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.NERU_APP_PORT || 3002;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.get('/public/*', function(req, res, next) {
  res.sendFile('index.html', {root: 'public'});
});

import indexRouter from './routes/index.js';
import { meetings } from './models/index.js';

app.get('/_/health', async (req, res) => {
    res.sendStatus(200);
});

app.use('/onMeetings', meetings.onCallback);
app.use("/meetings", indexRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

process.on("uncaughtException", (err) => {
  console.log("[uncaughtException] - general catch", err);
});
