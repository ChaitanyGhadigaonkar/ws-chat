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

const name = Joi.string().required().min(2).max(30).messages({
    "string.empty": "name is required",
    "string.required": "name is required",
    "string.min": "name is too short",
    "string.max": "name is too long"
})

export const LOGIN_SCHEMA = Joi.object().keys({
    email,
    password
})

export const SIGNUP_SCHEMA = Joi.object().keys({
    name,
    email,
    password
})