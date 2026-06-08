import express from "express";
import { captureLead, chat } from "../controllers/orbitController.js";

const router = express.Router();

router.post("/chat", chat);
router.post("/lead", captureLead);

export default router;
