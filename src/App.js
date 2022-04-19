import express from 'express';
import hbs from 'hbs';
import { join } from 'path';
import { cwd } from 'process';
import session from 'express-session';
import passport from 'passport';
import localStrategyFactory from './passport/LocalStrategyFactory.js'
import 'dotenv/config';

hbs.registerPartials(join(cwd(), 'src/views/partials'), function (err) {});

export class App {
  constructor(db, miscController, authController) {
    this.app = express();
    this.port = 9090;
    this.db = db;
    this.miscController = miscController;
    this.authController = authController;
  }

  useSettings() {
    this.app.set('views', join(cwd(), 'src/views'));
    this.app.set('view engine', 'hbs');
  }

  useMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    }));
    this.app.use(passport.authenticate('session', {
      failureRedirect: '/auth/login'
    }));
  }

  usePassport() {
    const { db } = this;
    passport.use(localStrategyFactory(db.dbClient));

    passport.serializeUser(function(user, cb) {
      process.nextTick(function() {
        cb(null, { id: user.id, username: user.username, email: user.email });
      });
    });

    passport.deserializeUser(function(user, cb) {
      process.nextTick(function() {
        return cb(null, user);
      });
    });
  }

  useRoutes() {
    this.app.use('/', this.miscController.router);
    this.app.use('/auth', this.authController.router);
  }

  init() {
    this.db.dbClient.connect();
    this.useSettings();
    this.usePassport();
    this.useMiddlewares();
    this.useRoutes();
    this.app.listen(this.port);
    console.log(`App is on and listening on port ${this.port}`);
  }
}
