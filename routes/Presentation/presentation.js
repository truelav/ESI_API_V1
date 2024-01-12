import express from "express";

import { createPDFPresentation } from "../../controllers/Presentation/index.js";

const router = express.Router();

router.post("/", createPDFPresentation);

export default router;
