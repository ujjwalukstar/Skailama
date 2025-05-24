const mongoose = require("mongoose");
const episodeModel = require("../Models/Episode");
const projectModel = require("../Models/Project");
const { errorResponse, successResponse } = require("../Utils/Response");

module.exports = {
  /**
   * Creates a new episode within a specified project.
   *
   * This function validates the user ID from the request headers and the project ID and episode name from the request body.
   *
   * If any validation fails or an error occurs, it sends an error response.
   *
   * @async
   * @function createNewEpisode
   * @param {string} req.body.name - The name of the episode to be created. (Required)
   * @param {string} req.body.projectId - The ID of the project to which the episode belongs. (Required)
   * @param {string} [req.body.content] - The content of the episode. (Optional)
   * @param {string} req.headers.userId - The ID of the user making the request. (Required)
   *
   * @returns {void} Sends a JSON response with the created episode data on success, or an error message on failure.
   *
   * @throws {string} If `userId`, `projectId`, or `name` is missing, or if the project doesn't exist, or any other error occurs.
   */
  createNewEpisode: async (req, res) => {
    try {
      const { name, projectId, content } = req.body;
      const { userId } = req.headers;

      if (!userId)
        errorResponse(
          res,
          "User id required !",
          "Failed while creating new episode",
          401
        );
      if (!projectId) throw "Project id is required";
      if (!name) throw "Episode name is required";

      const project = await projectModel.findByIdAndUpdate(projectId, {
        updatedAt: new Date(),
      });

      if (!project) throw "Project doesn't exist with this user";

      const result = await episodeModel.create({
        name,
        content,
        userId,
        projectId,
      });

      successResponse(res, result, "Successfully created new Episode");
    } catch (error) {
      errorResponse(res, error, "Failed while creating new episode");
    }
  },

  /**
   * Fetches the list of episodes for a specified project.
   *
   * This function validates the project ID from the request parameters, checks if the project exists,
   * and retrieves a list of episodes associated with the project. The episodes are sorted by the date
   * they were last updated. If the project doesn't exist or an error occurs during retrieval, an error
   * response is sent.
   *
   * @async
   * @function getEpisodeList
   * @param {string} req.params.projectId - The ID of the project whose episodes are to be fetched. (Required)
   *
   * @returns {void} Sends a JSON response with a list of episodes and the project name on success, or an error message on failure.
   *
   * @throws {string} If `projectId` is missing, if the project doesn't exist, or if any other error occurs.
   */
  getEpisodeList: async (req, res) => {
    try {
      const { projectId } = req.params;
      if (!projectId) throw "projectId is required!";

      const project = await projectModel.findById(projectId);

      if (!project) throw "Project is not exist";

      const result = await episodeModel.aggregate([
        {
          $match: {
            projectId: new mongoose.Types.ObjectId(projectId),
          },
        },
        {
          $project: {
            name: 1,
            date: "$updatedAt",
            id: "$_id",
            _id: 0,
          },
        },
        {
          $sort: {
            date: -1,
          },
        },
      ]);

      successResponse(
        res,
        { episodes: result, projectName: project?.title },
        "Episodes fetched successfully"
      );
    } catch (error) {
      errorResponse(res, error, "Failed while fetching episodes");
    }
  },

  getEpisodeById: async (req, res) => {
    try {
      const { episodeId } = req.params;

      const [result] = await episodeModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(episodeId),
          },
        },
        {
          $lookup: {
            localField: "projectId",
            foreignField: "_id",
            from: "projects",
            as: "project",
          },
        },
        {
          $unwind: "$project",
        },
        {
          $project: {
            name: 1,
            content: 1,
            _id: 0,
            projectName: "$project.title",
          },
        },
      ]);
      successResponse(res, result, "Successfully fetched episode content");
    } catch (error) {
      errorResponse(res, error, "Failed while fetching episode content");
    }
  },

  /**
   * Fetches the details of a specific episode by its ID.
   *
   * This function retrieves the episode details based on the provided episode ID from the request parameters.
   * It performs a lookup to fetch the associated project's name and returns the episode's name, content, and project name.
   * If an error occurs during retrieval, an error response is sent.
   *
   * @async
   * @function getEpisodeById
   * @param {string} req.params.episodeId - The ID of the episode to be fetched. (Required)
   *
   * @returns {void} Sends a JSON response with the episode details and project name on success, or an error message on failure.
   *
   * @throws {string} If `episodeId` is missing or if any other error occurs.
   */
  editEpisode: async (req, res) => {
    try {
      const { episodeId, projectId } = req.params;
      const { name, content } = req.body;
      const { userId } = req.headers;

      if (!episodeId) throw "Episode id is required !";
      if (!name) throw "Episode name is required !";

      const project = await projectModel.findByIdAndUpdate(projectId, {
        updatedAt: new Date(),
      });

      if (!project) throw "Project doesn't exist with this user";

      const result = await episodeModel.updateOne(
        { _id: episodeId, userId },
        {
          name,
          content,
        }
      );
      if (!result) throw "Something went wrong while updating episode";

      successResponse(res, result, "Successfully Updated episode");
    } catch (error) {
      errorResponse(res, error, "Something went wrong while updating episode");
    }
  },

  /**
   * Deletes a specific episode by its ID.
   *
   * This function deletes an episode based on the provided episode ID. If the episode ID or project ID is missing, or if the project doesn't exist, an error
   * response is sent.
   *
   * @async
   * @function deleteEpisode
   * @param {string} req.params.episodeId - The ID of the episode to be deleted. (Required)
   * @param {string} req.params.projectId - The ID of the project associated with the episode. (Required)
   *
   * @returns {void} Sends a JSON response confirming the deletion on success, or an error message on failure.
   *
   * @throws {string} If `episodeId` or `projectId` is missing, if the project doesn't exist, or if any other error occurs.
   */
  deleteEpisode: async (req, res) => {
    try {
      const { episodeId, projectId } = req.params;
      if (!episodeId) throw "Episode Id is required !";

      const project = await projectModel.findByIdAndUpdate(projectId, {
        updatedAt: new Date(),
      });

      if (!project) throw "Project doesn't exist with this user";

      const result = await episodeModel.deleteOne({ _id: episodeId });
      successResponse(res, result, "Successfully Deleted episode");
    } catch (error) {
      errorResponse(res, error, "Something went wrong while deleting episode");
    }
  },
};
