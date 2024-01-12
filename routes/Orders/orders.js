import express from "express";
import * as OrderControllers from "../../controllers/Order/OrderControllers.js";

const router = express.Router();

router.get("/", OrderControllers.getAllOrders);
router.post("/", OrderControllers.placeOrder)

export default router;
