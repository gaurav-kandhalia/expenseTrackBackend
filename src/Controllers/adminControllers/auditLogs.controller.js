import { AuditLog } from "../../models/auditLog.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


export const getAllAuditLogs = asyncHandler(async(req,res)=>{
    
    if(req.user.role!=="admin"){
        throw new ApiError(401,"unathorized request",false)
    }
    const logs = await AuditLog.find()
    .populate("userId","name email role")
    .populate("exepenseId","amount status createdAt notes")
    ;
    if(logs.length === 0){
      return  res.status(201)
        .json(
            new ApiResponse(201,logs,"no logs available",true)
        )
    }

    res.status(201)
    .json(
        new ApiResponse(201,logs,"logs are fetched successfully",true)
    )
})