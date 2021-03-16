require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(e => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

// setup router
router.use('/api', api.routes()); // apply api router

// apply bodyParser before router application
app.use(bodyParser());
app.use(jwtMiddleware);

// apply router in app instance
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../client/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
  // not found, start without /api
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    // return the content of index.html
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

// use 4000 if port doesn't setup
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
