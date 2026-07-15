import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectStats,
  addCollaborator,
  removeCollaborator,
} from "../controllers/projectController.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Project CRUD routes
router.post("/", createProject);
router.get("/", getUserProjects);
router.get("/stats", getProjectStats);
router.get("/:projectId", getProjectById);
router.put("/:projectId", updateProject);
router.delete("/:projectId", deleteProject);

// Collaborator routes
router.post("/:projectId/collaborators", addCollaborator);
router.delete("/:projectId/collaborators/:collaboratorId", removeCollaborator);

export default router;
