import Router from "router";

const adminRouter = Router();

import { createCategory } from "../../Controllers/adminControllers/createCategory.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import {isAdmin} from '../../middlewares/isAdmin.middleware.js'

adminRouter.post("/addCategory",isAuthenticated,isAdmin,createCategory)


export default adminRouter;