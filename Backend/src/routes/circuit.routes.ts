import Router from "express";
import { CircuitController } from "../controllers/circuit.controller";

const router = Router();
const controller = new CircuitController();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;

