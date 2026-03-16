import Router from "express";
import { SystemController } from "../controllers/system.controller";

const router = Router();
const controller = new SystemController();

router.get("/health", controller.getHealth);
router.get("/dashboard", controller.dashboardData);

export default router;

