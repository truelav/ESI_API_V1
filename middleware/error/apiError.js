export default class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Unauthorized Resource')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}