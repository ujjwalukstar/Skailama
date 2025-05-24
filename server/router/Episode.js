const {
  createNewEpisode,
  getEpisodeList,
  getEpisodeById,
  editEpisode,
  deleteEpisode,
} = require("../Controllers/Episode");

const router = require("express").Router();

router.post("/create", createNewEpisode);

router.get("/list/:projectId", getEpisodeList);

router.delete("/content/:episodeId/:projectId", deleteEpisode);

router.get("/content/:episodeId", getEpisodeById);

router.put("/content/:episodeId/:projectId", editEpisode);

module.exports = router;
