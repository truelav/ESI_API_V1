

import { httpLogger } from '../../config/winston_logger.setup.js';
import { getSuccessfulHTTPResponseMessage, getUnSuccessfulHTTPResponseMessage } from './utils/logger_messages.utils.js';
import formatHTTPLoggerResponse from './utils/format_http_logger_response.utils.js';

/**
 * Logger used for logging into files & CLI
 */
class HTTPLoggerService implements HTTPLoggerService {

  info(context, message = '') {
    return httpLogger.info(
      message || getSuccessfulHTTPResponseMessage(context?.req?.method),
      formatHTTPLoggerResponse(context)
    );
  }

  warn(context, message = '') {
    return httpLogger.warn(
      message || getUnSuccessfulHTTPResponseMessage(context?.req?.method),
      formatHTTPLoggerResponse(context)
    );
  }

  error(context, message = '') {
    return httpLogger.error(
      message || getUnSuccessfulHTTPResponseMessage(context?.req?.method),
      formatHTTPLoggerResponse(context)
    );
  }

}

export const httpLoggerService = new HTTPLoggerService();