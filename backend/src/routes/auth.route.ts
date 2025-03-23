import { Router } from "express";
import passport from "passport";
import { registerUser } from "../controllers/auth.controller";
import checkAuth from "../middlewares/auth.middleware";

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
    failWithError: true,
    failureMessage: "Failed to login",
  }),
  (req, res) => {
    res.status(200).json({ success: true, message: "logged in successfully" });
  }
);

authRouter.get("/profile", checkAuth, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
    message: "user details fetched successfully",
  });
});

authRouter.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log("GITHUB LOGOUT ERROR : " + err);
      throw new Error("Failed login with error");
    }
    res.status(200).json({ success: true, message: "logout sucessfully." });
  });
});

export default authRouter;
