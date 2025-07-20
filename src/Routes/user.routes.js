import { Router } from "express";
import { loginController, signUpController ,logoutController} from "../Controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.post("/signUp",signUpController)
userRouter.post("/login",loginController)
userRouter.post("/logout",isAuthenticated,logoutController);

export default userRouter;