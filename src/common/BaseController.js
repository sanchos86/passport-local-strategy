import { Router } from 'express';

export class BaseController {
  constructor(dbClient) {
    this.dbClient = dbClient;
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  bindRoutes(routes) {
    routes.forEach((route) => {
      const handler = route.func.bind(this);
      const pipeline = route.middleware ? [...route.middleware, handler] : handler;
      this._router[route.method](route.path, pipeline);
    });
  }
}
