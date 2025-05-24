const express = require("express");
const { createNewProject, getProjectsList } = require("../Controllers/Project");

const router = express.Router();

router.post("/create", createNewProject);
router.get("/list", getProjectsList);

module.exports = router;
