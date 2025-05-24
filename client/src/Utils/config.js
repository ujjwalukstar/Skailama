/**
 * List of formats supported by the text editor.
 *
 * @constant {string[]} formats
 */
export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "indent",
  "link",
  "image",
];

/**
 * Configuration for the text editor toolbar.
 *
 * @constant {Object} modules
 * @property {Object[]} toolbar - Toolbar options and their arrangement.
 */
export const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline", "strike"],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
  ],
};
