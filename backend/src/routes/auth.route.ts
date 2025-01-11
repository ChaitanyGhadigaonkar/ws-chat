import { Router } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

authRouter.get(
  "/github/callback",
  passport.authenticate("github"),
  (req, res) => {
    res.redirect("/api/auth/profile");
  }
);

authRouter.post(
  "/email-password/login",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/email-password/login",
  }),
  (req, res) => {
    res.redirect("/api/auth/profile");
  }
);

authRouter.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

authRouter.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log("GITHUB LOGOUT ERROR : " + err);
    }
    res.redirect("/");
  });
});

export default authRouter;
