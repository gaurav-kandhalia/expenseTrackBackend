import Router from "router";

const adminRouter = Router();

import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../../Controllers/adminControllers/category.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import {isAdmin} from '../../middlewares/isAdmin.middleware.js'
import { getAllExpenses, updateExpenseStatus } from "../../Controllers/adminControllers/expense.controller.js";
// category Routes
adminRouter.post("/addCategory",isAuthenticated,isAdmin,createCategory)
adminRouter.get("/getAllCategories",isAuthenticated,isAdmin,getAllCategories)
adminRouter.delete("/deleteCategory",isAuthenticated,isAdmin,deleteCategory)
adminRouter.put("/updateCategory",isAuthenticated,isAdmin,updateCategory)

// Expenses Routes
adminRouter.get("/Expenses",isAuthenticated,isAdmin,getAllExpenses);
adminRouter.put("/updateStatus",isAuthenticated,isAdmin,updateExpenseStatus)
export default adminRouter;