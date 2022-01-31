// @ts-nocheck
/* eslint-disable */
// disable linting for this file to fix .env from not loading google oauth client id

// if you want to use nextRoutes
// const routes = require('~server/core/nextRoutes')
require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import next from 'next';

import { schema } from '~lib/schema';
import { resolvers } from '~server/graphql/resolvers/clientResolver';
import { typeDefs } from '~server/graphql/types/clientType';

const { PORT = '3000', NODE_ENV } = process.env;
const port = parseInt(PORT, 10) || 3000;
const dev = NODE_ENV !== 'production';

console.log(`Running env; ${NODE_ENV}`);

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
// if you want to use nextRoutes
// const handle = routes.getRequestHandler(nextApp)

const playground = {
  endpoint: `/api/graphql`,
};

nextApp.prepare().then(() => {
  const server = express();

  // security
  server.use(helmet());

  // Generate logs
  server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  server.use(compression());

  // start apollo server

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    schema,
    playground,
  });

  apollo.applyMiddleware({ app: server, path: '/api/graphql' });

  server.get('*', (req, res) => handle(req, res));
  server.post('*', (req, res) => {
    return handle(req, res);
  });
  // express().use(handler).listen(3000) //routes handle way
  server.listen(port, err => {
    if (err) throw err;
  });
});
