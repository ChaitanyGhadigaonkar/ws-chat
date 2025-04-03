import { Router } from "express";

import checkAuth from "../middlewares/auth";
import { addContactViaEmail, getUserContacts } from "../controllers/contact";

const contactRouter = Router();

contactRouter.use(checkAuth);

contactRouter.get("/", getUserContacts);

contactRouter.post("/", addContactViaEmail);

export default contactRouter;
