import express from "express";
import * as ProductControllers from "../../controllers/Product/index.js";
import { upload } from "../../middleware/upload/index.js";
import { uploadProductsFile } from "../../middleware/upload/uploadProductsFile.js";

const router = express.Router();

router.delete("/image/:id", ProductControllers.deleteProductImage);

router.get("/", ProductControllers.getAllProducts);
router.get("/brandedProducts", ProductControllers.getBrandedProducts);
router.get("/:id", ProductControllers.getSingleProduct);
router.put("/", ProductControllers.editMultipleProducts);
router.delete("/:id", ProductControllers.deleteSingleProduct);
router.delete("/", ProductControllers.deleteMultipleProducts);
router.post("/", upload.single("image"), ProductControllers.addSingleProduct);
router.put("/:id", upload.single("image"), ProductControllers.editSingleProduct);
router.post("/addMultiple", uploadProductsFile.single("csv"), ProductControllers.addMultipleProducts);



export default router;
