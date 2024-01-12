import { HTTPStatusCodes } from "../../utils/constants.js"

export default class UserError extends Error {
    constructor(errorCode, message, statusCode) {
        super(message)
        this.errorCode = errorCode
        this.statusCode = statusCode
    }

    static UserExistAlready(email){
        return new UserError(HTTPStatusCodes.ExistsAlready, `User with ${email} already exists, please pick a different one`)
    }
}