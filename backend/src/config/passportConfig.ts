import passport, { DoneCallback } from "passport";
import { Strategy as GithubStrategy, Profile } from "passport-github2";

import { pool } from "../db/db";

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: DoneCallback
    ) => {
      try {
        let user;
        const response = await pool.query(
          `select name, email, profile_picture from users where email = $1`,
          [profile.emails?.[0].value]
        );
        if (response.rows.length > 0) {
          user = response.rows[0];
          done(null, user);
        } else {
          const result = await pool.query(
            "INSERT INTO users (name, email, profile_picture ) VALUES ($1, $2, $3) RETURNING name, email, profile_picture",
            [
              profile.displayName,
              profile.emails?.[0].value,
              profile.photos?.[0].value,
            ]
          );
          user = result.rows[0];
          done(null, user);
        }
      } catch (error) {
        console.log("GITHUB STRATEGY ERROR : " + error);
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((userId: string, done) => {
  done(null, userId);
});
