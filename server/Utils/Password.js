const bcrypt = require("bcryptjs");

module.exports = {
  /**
   * Generates a hashed password.
   *
   * This function takes a plain text password, generates a salt, and returns the hashed version of the password using bcrypt.
   * If an error occurs during the hashing process, it logs the error and throws the error message.
   *
   * @param {string} password - The plain text password to be hashed.
   * @returns {Promise<string>} The hashed password.
   *
   * @throws {string} If hashing fails, it throws the error message.
   *
   * @example
   * try {
   *   const hashedPassword = await getHash('myPassword123');
   *   console.log(hashedPassword); // Logs the hashed password
   * } catch (error) {
   *   console.error('Hashing failed:', error);
   * }
   */
  async getHash(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.log("Error", error);
      throw error.message;
    }
  },

  /**
   * Compares a plain text password with a hashed password.
   *
   * @param {string} password - The plain text password.
   * @param {string} hash - The hashed password.
   * @returns {Promise<boolean>} True if the passwords match, false otherwise.
   *
   * @throws {string} If comparison fails, it throws the error message.
   */
  compare(password, hash) {
    try {
      return bcrypt.compare(password, hash);
    } catch (error) {
      console.log("Error", error);
      throw error.message;
    }
  },
};
