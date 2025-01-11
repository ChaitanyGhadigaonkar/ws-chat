import passport, { DoneCallback } from "passport";
import { Strategy as GithubStrategy, Profile } from "passport-github2";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

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
            "INSERT INTO users (name, email, profile_picture, third_party_login ) VALUES ($1, $2, $3, TRUE) RETURNING name, email, profile_picture",
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
        done(
          {
            errorFrom: "passport",
            error,
          },
          null
        );
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const response = await pool.query(
          `select name, email, profile_picture, third_party_login, password from users where email = $1`,
          [email]
        );
        if (response.rows.length > 0) {
          const user = response.rows[0];

          // user exists but it was created by third party login
          if (user.third_party_login) {
            done(
              { errorFrom: "passport", error: { message: "User not found." } },
              false
            );
          }
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          // if password is incorrect
          if (!isPasswordCorrect) {
            done(
              {
                errorFrom: "passport",
                error: { message: "Email or Password is incorrect." },
              },
              false
            );
          }

          // https://stackoverflow.com/questions/35452844/how-to-show-custom-error-messages-using-passport-and-express
          // https://stackoverflow.com/questions/63152640/passport-js-sessions-react-accessing-req-user-from-any-route-other-than-th

          done(null, response.rows[0]);
        } else {
          done(
            {
              errorFrom: "passport",
              error: {
                message: "something went's wrong.",
              },
            },
            false
          );
        }
      } catch (error) {
        console.log("LOCAL STRATEGY ERROR : " + error);
        done(
          {
            errorFrom: "passport",
            error,
          },
          false
        );
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
