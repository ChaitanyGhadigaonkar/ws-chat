import Joi from "joi"

const email = Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty" : "email is required",
    "string.email": "enter valid email"
})

const password = Joi.string().required().min(6).max(12).messages({
    "string.empty": "password is required",
    "string.required": "password is required",
    "string.min": "password is too short",
    "string.max": "password is too long"
})

export const LOGIN_SCHEMA = Joi.object().keys({
    email,
    password
})
