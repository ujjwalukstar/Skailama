const { default: mongoose } = require("mongoose");
const projectModel = require("../Models/Project");
const { errorResponse, successResponse } = require("../Utils/Response");

module.exports = {
  /**
   * Creates a new project.
   *
   * This function creates a new project based on the user ID from the request headers and the project title from the request body.
   * It validates that both the user ID and title are provided. If any of these validations fail, an error response is sent.
   * On successful creation, the new project is returned in the response.
   *
   * @async
   * @function createNewProject
   * @param {string} req.headers.userId - The ID of the user creating the project. (Required)
   * @param {string} req.body.title - The title of the project to be created. (Required)
   *
   * @returns {void} Sends a JSON response with the created project data on success, or an error message on failure.
   *
   * @throws {string} If `userId` or `title` is missing, if the title is empty, or if any other error occurs.
   */
  createNewProject: async (req, res) => {
    try {
      const userId = req.headers?.userId;
      const title = req.body?.title;

      if (!userId) {
        errorResponse(res, error, "userId is required !", 401);
      }

      if (!title.trim()) {
        errorResponse(res, error, "Title is required !");
      }

      const result = await projectModel.create({ title, userId });
      if (result) {
        successResponse(res, result, "successfully created new project");
      }
    } catch (error) {
      errorResponse(res, error, "error while creating new project");
    }
  },

  /**
   * Fetches a list of projects for the authenticated user.
   *
   * This function retrieves a list of projects associated with the user ID provided in the request headers.
   * Each project includes its title, creation and update timestamps, and the count of associated episodes.
   * The projects are sorted by the `updatedAt` timestamp in descending order. If an error occurs during retrieval,
   * an error response is sent.
   *
   * @async
   * @function getProjectsList
   * @param {string} req.headers.userId - The ID of the user whose projects are to be fetched. (Required)
   *
   * @returns {void} Sends a JSON response with a list of projects, including episode counts, on success, or an error message on failure.
   *
   * @throws {string} If `userId` is missing, or if any other error occurs during the fetch operation.
   */
  getProjectsList: async (req, res) => {
    try {
      const { userId } = req.headers;

      const result = await projectModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "episodes",
            foreignField: "projectId",
            localField: "_id",
            as: "episodes",
          },
        },
        {
          $project: {
            title: 1,
            createdAt: 1,
            updatedAt: 1,
            episodeCount: { $size: "$episodes" },
          },
        },
        {
          $sort: {
            updatedAt: -1,
          },
        },
      ]);
      successResponse(res, result, "project list fetched successfully");
    } catch (error) {
      errorResponse(res, error, "error while fetching projects");
    }
  },
};
