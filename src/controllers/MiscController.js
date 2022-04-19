import connectEnsureLogin from 'connect-ensure-login';
import { BaseController } from '../common/BaseController.js';

export class MiscController extends BaseController {
  routes = [
    { path: '/', method: 'get', func: this.home },
    { path: '/profile', method: 'get', func: this.profile, middleware: [
        connectEnsureLogin.ensureLoggedIn('/auth/login')
      ]
    },
  ];

  constructor(dbClient) {
    super(dbClient);
    this.bindRoutes(this.routes);
  }

  home(req, res) {
    res.redirect('/profile');
  }

  profile(req, res) {
    res.render('profile', { user: req.user });
  }
}

