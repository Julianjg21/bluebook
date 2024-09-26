import express from "express";
import RegisterController from "../controllers/RegisterController.mjs";

//router that connects the routes with the main APP
const router = express.Router();
//Acceder al controlADOR PARA registrar un nuevo usuario
router.post("/register", RegisterController);


export default router;