module.exports = {
  /**
   * Sends a success response.
   *
   * This function sends a standardized JSON response for successful requests.
   *
   * @param {Object} res - The response object used to send the response.
   * @param {Object} data - The data to include in the response.
   * @param {string} [message="Request was successful!"] - A custom success message (optional).
   * @param {number} [status=200] - The HTTP status code (optional).
   *
   * @returns {void} Sends a JSON response with the success status, message, and data.
   */
  successResponse: (
    res,
    data,
    message = "Request was successful!",
    status = 200
  ) => {
    res.status(status).json({ success: true, message, data });
  },

  /**
   * Sends an error response.
   *
   * This function sends a standardized JSON response for failed requests and logs the error.
   *
   * @param {Object} res - The response object used to send the response.
   * @param {string|Object} error - The error information to include in the response.
   * @param {string} [message="Something went wrong!"] - A custom error message (optional).
   * @param {number} [status=500] - The HTTP status code (optional).
   *
   * @returns {void} Sends a JSON response with the error message and logs the error.
   */
  errorResponse: (
    res,
    error,
    message = "Something went wrong!",
    status = 500
  ) => {
    console.log("Error :-", message, "--", error);
    res
      .status(status)
      .json({ message, error: error?.message || error, success: false });
  },
};
