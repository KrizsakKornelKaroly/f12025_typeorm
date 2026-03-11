import Router from "express";
import { TeamController } from "../controllers/team.controller";

const router = Router();
const controller = new TeamController();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
