function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";
  console.log(err);
  if (err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = `Email Already Exists`;
  } else if (err.name === `SequelizeValidationError`) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "MidtransError") {
    code = 400;
    message = err.ApiResponse.error_messages[0];
  } else if (err.name === "nottransactional") {
    code = 404;
    message = "Silahan pesan Lucky Box terlebih dahulu";
  }
  res.status(status).json({ message });
}
module.exports = { errorHandler };
