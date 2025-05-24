/**
 * Checks if the user is logged in based on the presence of a token in local storage.
 *
 * @function isLogin
 * @returns {boolean} `true` if a token exists in local storage, `false` otherwise.
 */
export const isLogin = () => {
  return !!localStorage.getItem("token");
};

/**
 * Clears local storage and executes a callback function.
 *
 * Removes all items from local storage and calls the provided callback function.
 *
 * @function logOut
 * @param {Function} cb - The callback function to execute after logging out. (Required)
 * @returns {void}
 */
export const logOut = (cb) => {
  localStorage.clear();
  cb();
};
