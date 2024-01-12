export const customResponse = ({ data, success, error, message, status }) => {
  return {
    success,
    error,
    message,
    status,
    data,
  };
};

export default customResponse;
