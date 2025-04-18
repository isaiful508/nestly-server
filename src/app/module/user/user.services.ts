import User from './user.model';
import { IUser } from './user.interface';
import { comparePassword, generateUniqueUsername, hashPassword } from './user.utils';

const registerUserIntoDB = async (data: Partial<IUser>): Promise<IUser> => {
  const { name, email, password, phoneNumber, role } = data;
  // Generate a unique username
  const username = await generateUniqueUsername(name as string);
  const hashedPassword = await hashPassword(password!);
  const user = new User({
    name,
    username,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
  });
  return await user.save();
};

export const loginUserFromDB = async (identifier: string, password: string) => {
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
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


const updateProfileInDB = async (
  id: string,
  data: Partial<IUser> & { currentPassword?: string; newPassword?: string }
) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  if (data.currentPassword && data.newPassword) {
    const isMatch = await comparePassword(data.currentPassword, user.password);
    if (!isMatch) throw new Error("Current password is incorrect");

    user.password = await hashPassword(data.newPassword);
  }

  if (data.name) user.name = data.name;
  if (data.phone) user.phone = data.phone;
  if (data.profileImage) user.profileImage = data.profileImage;

  await user.save();

  return user;
};

export const UserServices = {
  registerUserIntoDB,
  loginUserFromDB,
  updateProfileInDB,
}