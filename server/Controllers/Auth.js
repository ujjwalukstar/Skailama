const userModel = require("../Models/User");
const { genJwtToken } = require("../Utils/Jwt");
const { successResponse, errorResponse } = require("../Utils/Response");

module.exports = {
  /**
   * Registers a new user.
   *
   * This function creates a new user in the database using the data provided in the request body.
   * It generates a JWT token for the user and returns it in a success response.
   * If something goes wrong, it sends an error response.
   *
   *  @example
   * // Request Body:
   * {
   *   "username": "johndoe",
   *   "email": "johndoe@example.com",
   *   "password": "securePassword123"
   * }
   *
   * // Success Response:
   * {
   *   "success": true,
   *   "message": "User registered successfully",
   *   "data": {
   *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *   }
   * }
   *
   * // Error Response:
   * {
   *   "success": false,
   *   "message": "Failed while registering new user",
   *   "error": "Email already exists"
   * }
   */
  registerUser: async (req, res) => {
    try {
      if (!req.body?.username) throw "username is required !";
      if (!req.body?.email) throw "email is required !";
      if (!req.body?.password) throw "password is required !";

      const result = await userModel.create(req.body);
      const token = genJwtToken(result?._id);
      successResponse(res, { token }, "user registered successfully");
    } catch (error) {
      if (error?.errorResponse?.code === 11000) {
        errorResponse(res, error, "User already exist");
      } else {
        errorResponse(res, error, "Failed while register new user");
      }
    }
  },

  /**
   * Logs in a user.
   *
   * This function checks if the email and password are provided, verifies the user's credentials,
   * and returns a JWT token if successful. If any step fails, it sends an error response.
   *
   * @returns {void} Sends a JSON response with a JWT token on success, or an error message on failure.
   *
   * @throws {string} If email or password is missing, incorrect, or if any other error occurs.
   */
  loginUser: async (req, res) => {
    try {
      if (!req.body?.email) throw "email is required !";
      if (!req.body?.password) throw "password is required !";

      const user = await userModel
        .findOne({ email: req.body?.email })
        .select("email username password");
      if (!user) throw "Email not found !";
      if (!(await user?.comparePassword(req.body?.password))) {
        throw "Incorrect Password !";
      }

      delete user.password;

      const token = genJwtToken(user?._id);
      successResponse(
        res,
        {
          token,
          user: {
            username: user?.username,
            email: user?.email,
            image: user?.profileImg || "",
          },
        },
        "user login successfully"
      );
    } catch (error) {
      errorResponse(res, error, "Failed while login");
    }
  },
};
