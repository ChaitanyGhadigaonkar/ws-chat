import expressAsyncHandler from "express-async-handler";

const checkAuth = expressAsyncHandler((req, res, next) => {
  const isAuthenticated = req.isAuthenticated();

  if (!isAuthenticated) {
    res.status(403).json({ message: "Not authenticated", success: false });
    return;
  }

  next();
});

export default checkAuth;
