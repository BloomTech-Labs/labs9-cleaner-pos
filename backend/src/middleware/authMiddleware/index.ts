import { Express } from 'express';
import passport from 'passport';
// @ts-ignore
// Distant TODO: Create index.d.ts
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const setAuthMiddleware = (server: Express) => {
  server.use(passport.initialize());

  passport.use(
    new GoogleStrategy(
      {
        callbackURL: 'http://localhost:5000/auth/google/callback',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
        // Reference: https://github.com/jaredhanson/passport-google-oauth2/pull/51/files
      },
      // @ts-ignore
      (accessToken, refreshToken, profile, done) => {
        done(null, profile);
      },
    ),
  );
};

export default setAuthMiddleware;
