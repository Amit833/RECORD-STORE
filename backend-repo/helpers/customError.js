const customError = (msg, status = 400) => {
  let error = new Error(msg);
  error.status = status;
  return error;
};

module.exports = customError;

// msg and status will come from another components
