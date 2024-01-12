import Joi from "joi"

const userSchema = {
    registerUser: Joi.object({
        name: Joi.string().min(3).max(15).required(), 
        email: Joi.string().email().required(), 
        password: Joi.string().min(6).required(), 
        status: Joi.string(),
        role: Joi.string()
    }),
    loginUser: Joi.object({}),
    editUser: Joi.object({}),
    sendVerificationMail: Joi.object({
        email: Joi.string().email().required(),
    }),
}

export default userSchema