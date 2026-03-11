import Router from "express";
import { RaceResultController } from "../controllers/raceresult.controller";

const router = Router();
const controller = new RaceResultController();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;

