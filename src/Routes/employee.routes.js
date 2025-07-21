import Router from "express";
import { AddExpense,allExpenses,deleteExpense,updateExpense } from "../Controllers/expense.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const employeeRouter = Router();

employeeRouter.post("/addExpense", isAuthenticated, AddExpense);
employeeRouter.get("/allExpenses",isAuthenticated,allExpenses)
employeeRouter.delete("/deleteExpense",isAuthenticated,deleteExpense)
employeeRouter.put("/updateExpense",isAuthenticated,updateExpense)
export default employeeRouter;
