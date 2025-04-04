import { Router } from "express";

import checkAuth from "../middlewares/auth";
import {
  addContactViaEmail,
  deleteContact,
  getContactDetails,
  getUserContacts,
  updateContact,
} from "../controllers/contact";

const contactRouter = Router();

contactRouter.use(checkAuth);

contactRouter.get("/", getUserContacts);

contactRouter.post("/", addContactViaEmail);

contactRouter.get("/:contactUserId", getContactDetails);

contactRouter.patch("/:contactUserId", updateContact);

contactRouter.delete("/:contactUserId", deleteContact);

export default contactRouter;
