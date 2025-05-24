const { getUserData, editUserData } = require("../Controllers/User");

const router = require("express").Router();

router.get("/", getUserData);

router.put("/edit", editUserData);

module.exports = router;
