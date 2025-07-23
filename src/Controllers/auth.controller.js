
import { asyncHandler } from "../utils/asyncHandler.js";
import { signupSchema,loginSchema } from "../Validations/auth.validations.js";
import {User} from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken';

const generateAccessandRefreshTokens = async(userId)=>{
     const user = await User.findById(userId);
   const accessToken =user.generateAccessToken();
   const refreshToken = user.generateRefreshToken();

 

     user.refreshToken  = refreshToken;
     await user.save({validateBeforeSave:false});

     return {refreshToken,accessToken}
}

export const signUpController = asyncHandler(async ( req, res) => {
    // take the data from the request body
    
    // validate the data
    // check if the user already exists or not
    // create the user in the database

    const validatedData = signupSchema.parse(req.body);
    // check if the user already exists
    const existingUser = await User.findOne({
        $or: [{email: validatedData.email}]
    });
    if(existingUser){
        throw new ApiError(409,"User with this email already exists");
    }
    // create the user
    const user = await User.create(validatedData);
    if(!user){
        throw new ApiError(500,"Something went wrong while creating the user");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false});

     const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
  )
  

  if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user")
  }


    // send the response
    return res.status(201).json(
      new ApiResponse(201,{user:createdUser,accessToken} , "User registered Successfully")
  )
    
})

// login user
export const loginController =  asyncHandler( async (req,res)=>{
    // take data entered by user --done
    //  operate username or email  --done
    // find the user  done
    // password check done
    // generate access and refresh token --done
    // send cookie (token) pass token


   
const validatedData = loginSchema.parse(req.body);

const user = await User.findOne({
    $or:[{email:validatedData.email}]
});
if(!user){
    throw new ApiError(401,"Invalid user Credentials");
}



const isPasswordValid =await user.comparePassword(validatedData.password);

if(!isPasswordValid){
    throw new ApiError(401,"Invalid user credentials");
}


const {accessToken,refreshToken} = await generateAccessandRefreshTokens(user._id);
console.log("accessToken",accessToken);
console.log("refreshToken",refreshToken);


const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


const options ={
    secure:true,
    httpOnly: true
}


res.
status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(new ApiResponse(200,
    {
        user:loggedInUser,accessToken,refreshToken

},
"user logged in successfully"
)
)



})

// export const loginController = asyncHandler(async (req, res, next) => {
//   try {
//     // Validate input
//     const validatedData = loginSchema.parse(req.body);

//     // Find user
//     const user = await User.findOne({ email: validatedData.email });
//     if (!user) {
//       throw new ApiError(401, "Invalid user credentials");
//     }

//     // Compare password
//     const isPasswordValid = await user.comparePassword(validatedData.password);
//     if (!isPasswordValid) {
//       throw new ApiError(401, "Invalid user credentials");
//     }

//     // Generate tokens
//     const { accessToken, refreshToken } = await generateAccessandRefreshTokens(user._id);

//     // Remove sensitive info
//     const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

//     // Set cookies
//     const options = {
//       secure: true,
//       httpOnly: true,
//     };

//     // Send response
//     res
//       .status(200)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", refreshToken, options)
//       .json(
//         new ApiResponse(
//           200,
//           {
//             user: loggedInUser,
//             accessToken,
//             refreshToken,
//           },
//           "User logged in successfully"
//         )
//       );
//   } catch (error) {
//     // Check if Zod error
//     if (error.name === "ZodError") {
//       return res.status(400).json({
//         success: false,
//         message: error.issues?.[0]?.message || "Validation failed",
//         error: error.issues,
//       });
//     }
//     next(error); // Other errors
//   }
// });

export const logoutController = asyncHandler(async (req, res) => {
    // Clear the access and refresh tokens from cookies
  const user = await User.findById(req.user._id);

  // Clear the refresh token
  user.accessToken = null;
  user.refreshToken = null;

  await user.save();

  // Respond with a success message
  res.json(new ApiResponse(200, {}, "User logged out successfully"));
});


export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(403, "Invalid refresh token");
  }

  const user = await User.findById(decoded._id);
  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(403, "Token mismatch or user not found");
  }

  const newAccessToken = user.generateAccessToken();
  res.status(200).json(
    new ApiResponse(200,{accessToken: newAccessToken}, "Access token refreshed successfully",true)
  );
});






