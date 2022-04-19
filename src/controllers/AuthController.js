import passport from 'passport';
import connectEnsureLogin from 'connect-ensure-login';
import { BaseController } from '../common/BaseController.js';

export class AuthController extends BaseController {
  routes = [
    { path: '/login', method: 'get', func: this.renderLoginPage, middleware: [
        connectEnsureLogin.ensureNotLoggedIn('/profile')
      ]
    },
    { path: '/login', method: 'post', func: this.login, middleware: [
        passport.authenticate('local', {
          successReturnToOrRedirect: '/',
          failureRedirect: '/auth/login'
        })
      ]
    },
    { path: '/register', method: 'get', func: this.renderRegisterPage, middleware: [
        connectEnsureLogin.ensureNotLoggedIn('/profile')
      ]
    },
    { path: '/register', method: 'post', func: this.register },
    { path: '/logout', method: 'post', func: this.logout },
  ];

  constructor(dbClient) {
    super(dbClient);
    this.bindRoutes(this.routes);
  }

  renderLoginPage(req, res) {
    res.render('login');
  }

  login() {}

  renderRegisterPage(req, res) {
    res.render('registration');
  }

  register(req, res, next) {
    const {
      username,
      email,
      password
    } = req.body;
    const user = {
      username,
      email,
      password
    };
    this.dbClient.query('insert into users set ?', user, (error, results) => {
      if (error) {
        return next(error);
      }
      const { insertId } = results;
      req.login({ id: insertId, username, email }, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  }

  logout(req, res) {
    req.logout();
    res.redirect('/auth/login');
  }
}
