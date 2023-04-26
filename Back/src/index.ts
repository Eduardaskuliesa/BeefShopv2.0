import express from 'express';
import bodyParser from 'body-parser';
import cokieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import log from 'utils/logger';
import deserializeUser from 'middleware/deserialize.user';
import dotenv from 'dotenv';
import config from 'config';
import routes from 'router';

dotenv.config();

const server = express();

server.use(cors({
    credentials: true,
}));
server.use(morgan('dev'));
server.use(express.static('public'));
server.use(express.json());
server.use(compression());
server.use(cokieParser());
server.use(bodyParser.json());
server.use(deserializeUser);

mongoose.set('strictQuery', false);
mongoose.connect(config.mongo.key)
    .then(() => {
        log.info('mongoose connceted');
    }).catch((e) => {
        console.log(e);
    });

server.listen(config.server.port, () => {
    log.info(`server is running on: http://${config.server.domain}:${config.server.port}`);
    routes(server);
});
