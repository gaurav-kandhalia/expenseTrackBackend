import Router from "express";
import { AddExpense } from "../Controllers/expense.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const employeeRouter = Router();

employeeRouter.post("/addExpense", isAuthenticated, AddExpense);

export default employeeRouter;
