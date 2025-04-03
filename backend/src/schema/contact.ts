import Joi from "joi";
import { CONTACT_FILTER } from "../types/contact";

const type = Joi.string()
  .valid(...Object.values(CONTACT_FILTER))
  .messages({
    "string.required": "type is required",
    "string.valid": `enter valid type`,
  });

const searchText = Joi.string().allow("");

export const GET_USER_CONTACTS = Joi.object().keys({ type, searchText });

const email = Joi.string().email().messages({
  "string.required": "Email is required",
  "string.email": "Enter a valid email",
  "string.empty": "Email is required",
});

export const ADD_CONTACT_VIA_EMAIL = Joi.object().keys({ email });
