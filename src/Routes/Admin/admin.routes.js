import Router from "router";

const adminRouter = Router();

import { createCategory, getAllCategories } from "../../Controllers/adminControllers/category.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import {isAdmin} from '../../middlewares/isAdmin.middleware.js'

adminRouter.post("/addCategory",isAuthenticated,isAdmin,createCategory)
adminRouter.get("/getAllCategories",isAuthenticated,isAdmin,getAllCategories)
export default adminRouter;