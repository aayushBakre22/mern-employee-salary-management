import express from "express";
import { createOvertime, getOvertime } from "../controllers/DataOvertime.js";

const router = express.Router();

// Create overtime entry
router.post("/overtime", createOvertime);

// Get all overtime entries (for testing/debugging)
router.get("/overtime", getOvertime);

export default router;
