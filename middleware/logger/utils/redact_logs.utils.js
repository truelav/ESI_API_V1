const sensitiveKeysList = Object.values(SensitiveKeys);

// Used to obscure senstitive information from logs, such as passwords
const redactLogData = (data) => {

  // to avoid calling redact function on native Mongoose/MongoDB model
  // we check if !data.constructor.name.startsWith('model')

  if (typeof data === 'object' && data !== null && !data.constructor.name.startsWith('model')) {
    if (Array.isArray(data)) {
      return data.map(item => redactLogData(item));
    }

    const redactedData = {};

    for (const key in data) {
      if (sensitiveKeysList.includes(key)) {
        redactedData[key] = SpecialMessages.Redacted;
      } else {
        // Recursively redact sensitive keys within nested objects
        redactedData[key] = redactLogData(data[key]);
      }
    }

    return redactedData;
  } else {
    return data;
  }
};

export default redactLogData;