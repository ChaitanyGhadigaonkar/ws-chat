import { Router } from "express";
import passport from "passport";
import { registerUser } from "../controllers/auth.controller";

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
    res.redirect("http://localhost:5173/main/chats");
  }
);

authRouter.post("/email-password/register", registerUser);

authRouter.post(
  "/email-password/login",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/email-password/login",
  }),
  (req, res) => {
    res.status(200).json({ success: true, message: "logged in successfully" });
  }
);

authRouter.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      success: true,
      user: req.user,
      message: "user details fetched successfully",
    });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

authRouter.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log("GITHUB LOGOUT ERROR : " + err);
    }
    res.status(200).json({ success: false, message: "logout sucessfully." });
  });
});

export default authRouter;
