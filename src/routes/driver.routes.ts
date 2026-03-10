import Router from "express";
import { DriverController } from "../controllers/driver.controller";

const router = Router();
const controller = new DriverController();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;

