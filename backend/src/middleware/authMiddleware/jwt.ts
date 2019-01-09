import passport from 'passport';
import passportJwt from 'passport-jwt';
import db from '../../../data/dbConfig';
import userModels from '../../models/users';

const { findUser } = userModels(db);

const { JWT_SECRET } = process.env;
const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: JWT_SECRET,
};

// this will be used to check a token on protected routes `passport.authenticate(['jwt'], { session: false })`
passport.use(
  new passportJwt.Strategy(jwtOptions, async (payload, done) => {
    try {
      const searchUser = await findUser(payload.externalID);
      if (searchUser) {
        return done(null, searchUser, payload);
      } else {
        return done(401);
      }
    } catch (err) {
      console.log('jwt error', err);
    }
  }),
);
