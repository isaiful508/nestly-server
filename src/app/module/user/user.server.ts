import User from './user.model';
import { IUser } from './user.interface';
import { comparePassword, hashPassword } from './user.utils';

const registerUserIntoDB = async (data: Partial<IUser>): Promise<IUser> => {
  const { name, email, password, phoneNumber, role } = data;

  const hashedPassword = await hashPassword(password!);

  const user = new User({
    name,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
  });
  return await user.save();
};

export const loginUserFromDB = async (identifier: string, password: string) => {
  // Find by email or username
  const user = await User.findOne({
    $or: [{ email: identifier }, { name: identifier }],
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid credentials');
  }

  if (!isPasswordMatch) {
    throw new Error('Invalid credentials');
  }

  return user;
};

// const getAllUsers = async () => {
//   const result = await User.find()
//   return result
// }

// export const toggleUserStatus = async (userId: string, isActive: boolean) => {
//   if (!Types.ObjectId.isValid(userId)) {
//     throw new Error("Invalid user ID");
//   }

//   const user = await User.findById(userId);
//   if (!user) {
//     throw {
//       statusCode: StatusCodes.NOT_FOUND,
//       message: "User not found",
//       error: { details: "User ID did not match any records" },
//     };
//   }

//   user.isActive = isActive;
//   await user.save();
// };

// const updateUser = async (id: string, data: IUser) => {
//   const result = await User.findByIdAndUpdate(id, data, {
//     new: true, 
//     runValidators: true,  // Ensures validation rules are applied
//   });

//   return result;
// };


export const UserServices = {
  registerUserIntoDB,
  loginUserFromDB
}