const { Schema, model } = require("mongoose");
const { getHash, compare } = require("../Utils/Password");
const mongoose_delete = require("mongoose-delete");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is Required !"],
  },
  email: {
    type: String,
    required: [true, "Email is Required !"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required !"],
    select: false,
  },
  profileImg: {
    type: String,
    default: "",
  },
  fName: {
    type: String,
    default: "",
  },
  lName: {
    type: String,
    default: "",
  },
  phone: {
    type: Number,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await getHash(this.password);
  }
  next();
});

userSchema.methods.comparePassword = function (password) {
  return compare(password, this.password);
};

userSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const userModel = model("users", userSchema);

module.exports = userModel;
