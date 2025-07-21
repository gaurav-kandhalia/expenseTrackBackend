import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import morgan from 'morgan';
import userRouter from './Routes/user.routes.js'
import employeeRouter from './Routes/employee.routes.js';
import adminRouter from './Routes/Admin/admin.routes.js';

const app = express();

app.use(morgan("dev"))
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(cookieParser())
app.use(express.json({limit:"16kb"}));
app.use(express.static("public"));
app.use(express.urlencoded({
    limit:"16kb",
    extended:true
}))


app.get('/',(req,res)=>{
    res.send("Welcome to Expense Tracker API")
})
app.use('/api/v1/user', userRouter);
app.use('/api/v1/expense', employeeRouter);
app.use('/api/v1/admin',adminRouter)







export {app}