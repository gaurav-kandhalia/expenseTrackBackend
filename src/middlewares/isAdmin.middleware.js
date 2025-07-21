import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


 export async function isAdmin(req, res, next) {
//   const user = await User.findById(req.user._id).select("role");
  console.log("user",req.user)
  const user = req.user;
  if (!user || user.role !== "admin") {
    return res.status(403).json({
      message: "You are not authorized to perform this action",
    });
  }
  next();
}
