import { Router } from "express";
import { getProjects } from "../controllers/projectController";

const router = Router();

router.get("/", getProjects); // from index the /projects reaches this route

export default router;
