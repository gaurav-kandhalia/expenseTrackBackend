import Router from "express";
import { AddExpense,allExpenses,deleteExpense,getCategories,updateExpense } from "../Controllers/expense.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const employeeRouter = Router();
import { EmployeeExpenses } from "../models/employeeExpense.model.js";
import{upload} from '../middlewares/multer.middleware.js'

// employeeRouter.post("/addExpense", isAuthenticated,upload.fields([{ name: "reciept", maxCount: 1 }]), AddExpense);
employeeRouter.post("/addExpense", isAuthenticated, AddExpense);
employeeRouter.get("/allExpenses",isAuthenticated,allExpenses)
employeeRouter.delete("/deleteExpense",isAuthenticated,deleteExpense)
employeeRouter.put("/updateExpense",isAuthenticated,updateExpense)
employeeRouter.get("/getCategories",isAuthenticated,getCategories);

export default employeeRouter;
