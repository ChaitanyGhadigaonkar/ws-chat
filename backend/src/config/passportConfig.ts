import passport, { DoneCallback } from "passport";
import { Strategy as GithubStrategy, Profile } from "passport-github2";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import prisma from "./db/prisma";
import { LOGIN_SCHEMA } from "../schema/auth";

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
        const user = await prisma.user.findFirst({
          where: {
            email: profile.emails?.[0].value,
          },
          omit: {
            password: true,
          },
        });
        if (user) {
          done(null, user);
        } else {
          const newUser = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails?.[0].value!,
              thirdPartyLogin: true,
            },
            omit: {
              password: true,
            },
          });

          done(null, newUser);
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
        const validate = LOGIN_SCHEMA.validate({ email, password });
        if (validate.error) {
          throw new Error(validate.error.message);
        }

        const user = await prisma.user.findFirst({
          where: {
            email: validate.value.email,
          },
        });
        if (user) {
          // user exists but it was created by third party login
          if (user.thirdPartyLogin) {
            done(
              {
                errorFrom: "passport",
                error: { message: "account is created using socials login" },
              },
              false
            );
          }
          const isPasswordCorrect = await bcrypt.compare(
            validate.value.password,
            user.password!
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
          done(null, {
            id: user.id,
            email: user.email,
            name: user.name,
            thirdPartyLogin: user.thirdPartyLogin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          });
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
