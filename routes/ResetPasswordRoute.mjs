import express from "express";
import { RequestResetController, verifyCodeController, changePasswordController  } from "../controllers/ResetPasswordController.mjs"
import verifyResetCodeMiddleware from "../middlewares/verifyResetCodeMiddleware.mjs";
//router that connects the routes with the main APP
const router = express.Router();

router.post("/request-reset", RequestResetController);
router.post("/Verify-code", verifyCodeController);
router.post("/change-password", verifyResetCodeMiddleware, changePasswordController);

export default router;