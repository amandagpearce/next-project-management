import { Router } from "express";
import { getTasks, createTask, updateTaskStatus } from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask); // index setups the /projects route to reach here
router.patch("/:taskId/status", updateTaskStatus);

export default router;
