import express from "express";
import * as UsersControllers from "../../controllers/Users/UsersControllers.js";
import isAuth from "../../middleware/auth/isLoggedIn.js";
import isAdmin from "../../middleware/auth/isAdmin.js";
import isLoggedIn from "../../middleware/auth/isLoggedIn.js";

const router = express.Router();

router.get("/", UsersControllers.getAllUsers);

export default router;
