
import redactLogData from './redact_logs.utils.js';

const formatHTTPLoggerResponse = (context) => {
  let requestDuration = '.';

  if (context.req?.requestStartTime) {
    const endTime = Date.now() - context.req.requestStartTime;
    requestDuration = `${endTime / 1000}s`;
  }

  return {
    request: {
      headers: context?.req?.headers,
      host: context?.req?.headers.host,
      protocol: context?.req?.protocol,
      baseUrl: context?.req?.baseUrl,
      url: context?.req?.url,
      method: context?.req?.method,
      body: redactLogData(context?.req?.body),
      params: context?.req?.params,
      query: context?.req?.query,
      clientIp:
      context.req?.headers[HTTPHeaders.ForwardedFor] ?? context.req?.socket.remoteAddress,
      requestDuration,
    },
    response: {
      headers: context?.res?.getHeaders(),
      statusCode: context?.error?.statusCode ?? context?.res?.statusCode,
      body: redactLogData(context.responseBody)
    },
    error: {
      name: context?.error?.name,
      statusCode: context?.error?.statusCode,
      message: context?.error?.message,
      stackTrace: context?.error?.stack
    },
    customMetaData: context?.customMetaData
  };
};

export default formatHTTPLoggerResponse;