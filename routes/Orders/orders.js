import express from "express";
import { getAllOrders, createOrder, deleteOrders } from "../../controllers/Order/index.js";

const router = express.Router();

router.get("/", getAllOrders);
router.post("/", createOrder)
router.delete('/', deleteOrders)

export default router;
