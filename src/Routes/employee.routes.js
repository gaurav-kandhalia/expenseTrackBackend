import { Router } from "express";
import { loginController, signUpController ,} from "../Controllers/auth.controller.js";
const router = Router();

router.route("/signUp").post(signUpController)
router.route("/login").post(loginController)

export default employeeController;