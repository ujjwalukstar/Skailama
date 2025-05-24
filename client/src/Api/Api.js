import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({ baseURL });

const manageInterceptorsAtRequest = (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

api.interceptors.request.use(manageInterceptorsAtRequest, (error) => {
  return Promise.reject(error);
});

export async function register(data) {
  return api.post("/auth/register", data);
}

export async function login(data) {
  return api.post("/auth/login", data);
}

export async function createProject(data) {
  return api.post("/project/create", data);
}

export async function getProjects() {
  return api.get("/project/list");
}

export async function createEpisode(data) {
  return api.post("/episode/create", data);
}

export async function getEpisodes(projectId) {
  return api.get(`/episode/list/${projectId}`);
}

export async function getEpisodeById(episodeId) {
  return api.get(`/episode/content/${episodeId}`);
}

export async function updateEpisode(episodeId, projectId, data) {
  return api.put(`/episode/content/${episodeId}/${projectId}`, data);
}

export async function deleteEpisode(episodeId, projectId) {
  return api.delete(`/episode/content/${episodeId}/${projectId}`);
}

export async function getUserData() {
  return api.get(`/user`);
}

export async function editUserData(data) {
  return api.put(`/user/edit`, data);
}
