import { Router } from "express";
import { getProjects, createProject } from "../controllers/projectController";

const router = Router();

router.get("/", getProjects); // index setups the /projects route to reach here
router.post("/", createProject);

export default router;
