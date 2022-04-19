import { App } from './App.js';
import { MysqlClient } from './MysqlClient.js';
import { AuthController } from './controllers/AuthController.js';
import { MiscController } from './controllers/MiscController.js';

const bootstrap = async () => {
  const db = new MysqlClient();
  const miscController = new MiscController(db.dbClient);
  const authController = new AuthController(db.dbClient);

  const app = new App(db, miscController, authController);
  await app.init();
};

bootstrap();
