const userModel = require("../Models/User");
const { errorResponse, successResponse } = require("../Utils/Response");

module.exports = {
  /**
   * Fetches the data of the authenticated user.
   *
   * This function retrieves the user's data based on the user ID provided in the request headers.
   * The retrieved data excludes sensitive fields such as the password, deleted status, MongoDB version key (`__v`), and the MongoDB ID (`_id`).
   * If an error occurs during the data retrieval, an error response is sent.
   *
   * @async
   * @function getUserData
   * @param {string} req.headers.userId - The ID of the user whose data is to be fetched. (Required)
   *
   * @returns {void} Sends a JSON response with the user's data on success, or an error message on failure.
   *
   * @throws {string} If `userId` is missing, or if any other error occurs during the fetch operation.
   */
  getUserData: async (req, res) => {
    try {
      const { userId } = req.headers;
      const result = await userModel
        .findById(userId)
        .select("-password -deleted -__v -_id");
      successResponse(res, result, "Successfully fetched user data");
    } catch (error) {
      errorResponse(res, error, "error while fetching user data");
    }
  },
  
  /**
   * Updates the data of the authenticated user.
   *
   * This function updates the user's data based on the user ID provided in the request headers and the new data provided in the request body.
   * It validates that the username is provided and that the phone number, if provided, is exactly 10 digits.
   * The updated data excludes sensitive fields such as the password, deleted status, MongoDB version key (`__v`), and the MongoDB ID (`_id`).
   * If any validation fails or an error occurs during the update, an error response is sent.
   *
   * @async
   * @function editUserData
   * @param {string} req.headers.userId - The ID of the user whose data is to be updated. (Required)
   * @param {string} [req.body.username] - The new username of the user. (Required)
   * @param {string} [req.body.fName] - The new first name of the user. (Optional)
   * @param {string} [req.body.lName] - The new last name of the user. (Optional)
   * @param {string} [req.body.phone] - The new phone number of the user. (Optional)
   * @param {string} [req.body.profileImg] - The URL of the new profile image for the user. (Optional)
   *
   * @returns {void} Sends a JSON response with the updated user data on success, or an error message on failure.
   *
   * @throws {string} If `username` is missing, if `phone` is not exactly 10 digits, or if any other error occurs during the update operation.
   */
  editUserData: async (req, res) => {
    try {
      const { userId } = req.headers;
      const { username, fName, lName, phone, profileImg } = req.body;

      if (!username) throw "Username is required !";

      if (!!phone && `${phone}`.length !== 10)
        throw "Phone number should be 10 digits";

      const result = await userModel
        .findByIdAndUpdate(
          userId,
          {
            username,
            fName,
            lName,
            phone,
            profileImg,
          },
          { new: true }
        )
        .select("-password -deleted -__v -_id");
      successResponse(res, result, "Successfully edited user data");
    } catch (error) {
      errorResponse(res, error, "error while editing user data");
    }
  },
};
