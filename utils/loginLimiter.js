import rateLimit from "express-rate-limiter";
import { logEvents } from "../middleware/error/logEvents.js";

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5,
  message: {
    message:
      "You have attempted too many logins from this IP address, try again after 1 minute",
    handler: (req, res, next, options) => {
      logEvents(
        `Too many Requests: ${options.message.message}\t${req.method}/t${req.url}/t${req.headers.origin}`,
        "errLog.log",
      );
      res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,
  },
});
