import LocalStrategy from 'passport-local';

const localStrategyFactory = (dbClient) => new LocalStrategy(function(username, password, done) {
  dbClient.query('SELECT * FROM users WHERE username = ?', username, (error, results) => {
    if (error) {
      return done(error);
    }
    if (!results) {
      return done(null, false, { message: 'incorrect username' });
    }
    if (results[0]?.password !== password) {
      return done(null, false, { message: 'incorrect password' });
    }
    return done(null, results[0]);
  });
});

export default localStrategyFactory;
