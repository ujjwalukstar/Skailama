const { errorResponse } = require("../Utils/Response");
const { decodeJwtToken } = require("../Utils/Jwt");

module.exports = {
  /**
   * Middleware function to authenticate requests using a JWT token.
   *
   * This function extracts the JWT token from the `Authorization` header of the request, decodes the token to retrieve
   * the user ID, and attaches the user ID to the request headers. If the token is missing or invalid, an error response
   * is sent. If decoding the token fails, an error response is also sent.
   *
   * @function authenticate
   * @param {Object} req - The request object, containing headers with the JWT token.
   * @param {Object} res - The response object, used to send error responses if authentication fails.
   * @param {Function} next - The next middleware function to call if authentication is successful.
   *
   * @returns {void} Calls `next()` to pass control to the next middleware function if authentication is successful,
   * or sends an error response if authentication fails.
   *
   * @throws {string} If the JWT token is missing, invalid, or if any error occurs while decoding the token.
   */
  authenticate: (req, res, next) => {
    try {
      const token = req.headers?.authorization?.split(" ").pop();
      if (!token) {
        errorResponse(
          res,
          "authentication token not found",
          "authentication failed",
          401
        );
      } else {
        const decode = decodeJwtToken(token);
        req.headers.userId = decode.id;
        next();
      }
    } catch (error) {
      errorResponse(res, error, "Error while decoding token", 401);
    }
  },
};
