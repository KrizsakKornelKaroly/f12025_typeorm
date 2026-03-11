import Router from "express";
import { RaceController } from "../controllers/race.controller";

const router = Router();
const controller = new RaceController();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);


export default router;

