import bcrypt from 'bcrypt';
import User from './user.model';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};


export const generateUniqueUsername = async (name: string): Promise<string> => {

  if (!name) {
    throw new Error('Name is required');
  }
  const baseUsername = name.replace(/\s+/g, '').toLowerCase();

  let username = baseUsername;
  let user = await User.findOne({ username });
  let counter = 1;

  while (user) {
    username = `${baseUsername}${counter}`;
    user = await User.findOne({ username });
    counter++;
  }
  return username;
};
