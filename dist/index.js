"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// if you want to use nextRoutes
// const routes = require('~server/core/nextRoutes')
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const apollo_1 = __importDefault(require("~server/core/apollo"));
const { PORT = '3000', NODE_ENV } = process.env;
const port = parseInt(PORT, 10) || 3000;
const dev = NODE_ENV !== 'production';
console.log('Running env; ' + NODE_ENV);
const nextApp = next_1.default({ dev });
const handle = nextApp.getRequestHandler();
// if you want to use nextRoutes
// const handle = routes.getRequestHandler(nextApp)
nextApp.prepare().then(() => {
    const server = express_1.default();
    //security
    server.use(helmet_1.default());
    // Generate logs
    server.use(morgan_1.default(':method :url :status :res[content-length] - :response-time ms'));
    server.use(compression_1.default());
    //start apollo server
    apollo_1.default.applyMiddleware({ app: server });
    server.get('*', (req, res) => handle(req, res));
    // express().use(handler).listen(3000) //routes handle way
    server.listen(port, err => {
        if (err)
            throw err;
    });
});
