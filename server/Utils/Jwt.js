const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * Generates a JWT token.
   *
   * This function creates a JSON Web Token (JWT) using the provided user ID. The token is signed with a secret key and expires in 1 day.
   *
   * @param {string} id - The user ID to include in the token payload.
   * @returns {string} The generated JWT token.
   *
   * @throws {string} If token generation fails, it throws the error message.
   */
  genJwtToken: (id) => {
    try {
      const payload = { id };
      return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
    } catch (error) {
      throw error?.message;
    }
  },

  /**
   * Decodes a JWT token to extract its payload.
   *
   * This function decodes a JWT token and returns the payload as a JSON object. If an error occurs during decoding,
   * the function throws an error with the error message.
   *
   * @function decodeJwtToken
   * @param {string} token - The JWT token to be decoded. (Required)
   *
   * @returns {Object} The payload of the JWT token as a JSON object.
   *
   * @throws {string} If an error occurs during decoding, throws an error with the error message.
   */
  decodeJwtToken: (token) => {
    try {
      return jwt.decode(token, { json: true });
    } catch (error) {
      throw error?.message;
    }
  },
};
