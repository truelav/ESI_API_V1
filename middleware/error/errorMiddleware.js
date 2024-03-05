import ApiError from './apiError.js'
import AppError from './appError.js';
import UserError from './userError.js';

export const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    console.error(err.stack)

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    err.message = err.message || 'Oops, Something Unexpected Happened Custom error!!!'

    // Here I need to check for each type of error that can occur
    // Http Error
    // API Error
    // Etc Error

    // res.status(err.statusCode).json({
    //     status: err.statusCode,
    //     message: err.message || "Internal Server Error"
    // })

    // if(err instanceof UserError){
    //     return res.status(err.status).json({message: err.message, error: err})
    // }

    // if (err instanceof ApiError) {
    //     return res.status(err.status).json({message: err.message, error: err})
    // }

    if (process.env.NODE_ENV === 'development') {
        // In development, send detailed error information
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    } else {
        // In production, send a simplified error message
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
};