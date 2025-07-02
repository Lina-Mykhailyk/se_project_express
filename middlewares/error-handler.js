const { SERVER_ERROR } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  console.error(err);

  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === SERVER_ERROR
        ? "An error has occurred on the server."
        : message,
  });
};
