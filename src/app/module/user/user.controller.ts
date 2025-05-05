
import config from '../../config';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.services';
import { loginValidationSchema, registerValidationSchema } from './user.validation';
import { sendResponse } from '../../utils/sendResponse';


const JWT_SECRET = config.jwt_secret as string;

const registerUser = catchAsync(async (req, res) => {
  const validatedData = registerValidationSchema.parse(req.body);


  const result = await UserServices.registerUserIntoDB(validatedData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});



export const loginUser = catchAsync(async (req, res) => {
  const validatedData = loginValidationSchema.parse(req.body);
    const identifier = validatedData.email || validatedData.username;

    if (!identifier) {
      throw {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Email or username is required',
        error: { details: 'Please provide either email or username' },
      };
    }
  
    const user = await UserServices.loginUserFromDB(identifier, validatedData.password);
  if (!user) {
    throw {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: "User not found",
      error: { details: "Email or password did not match" },
    };
  }


  const token = jwt.sign({ 
    id: user._id,
    email : user.email,
    name : user.name,
    role: user.role,
    phoneNumber : user.phoneNumber,
  }, JWT_SECRET, { expiresIn: '24h' });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful',
    data: { token },
  });
});


// const updateProfile = catchAsync(async (req, res) => {
//   const userId = req.user.id;
//   const { name, phoneNumber, profileImage, currentPassword, newPassword } = req.body;

//   const updatedUser = await UserServices.updateProfileInDB(userId, {
//     name,
//     phoneNumber,
//     profileImage,
//     currentPassword,
//     newPassword,
//   });

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "Profile updated successfully",
//     data: updatedUser,
//   });
// });


export const updateProfile = catchAsync(async (req, res) => {
  // const userId = req.user.id;
  // - Get `authorization_token` from headers.
  // - decrypt authorization_token
  // - get user id from decrypted authorization token.
  const {authorization} = req.headers;
  // @ts-expect-error id is cuasing type error. We know id is always available.
  const {id: userId} = jwt.decode(authorization as string)
console.log("userId.....", userId);
  const { name, phoneNumber, profileImage, currentPassword, newPassword } = req.body;

  const updatedUser = await UserServices.updateProfileInDB(userId, {
    name,
    phoneNumber,
    profileImage,
    currentPassword,
    newPassword,
  });



  const userPayload = updatedUser.toObject();
  //@ts-ignore
  delete userPayload.password;
    //@ts-ignore
  delete userPayload.__v;

  const token = jwt.sign(
    userPayload,
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  sendResponse(res, {
    success:    true,
    statusCode: 200,
    message:    "Profile updated successfully",
    data: {
      user:  updatedUser,
      token, 
    },
  });
});


export const UserControllers = {
  registerUser,
  loginUser,
  updateProfile,

};