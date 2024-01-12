import express from "express";
import { placeOrder } from "../../controllers/Cart/PlaceOrder.js";
const router = express.Router();

// router.get("/", ProductControllers.getAllProducts);
// router.delete("/", ProductControllers.deleteMultipleProducts);
// router.post("/", ProductControllers.addSingleProduct);
router.post("/placeOrder", placeOrder);


export default router;
