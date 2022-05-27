import * as bcrypt from 'bcrypt';

export const generateHash = async (password: string) =>
  bcrypt.hash(password, await bcrypt.genSalt());

export const isPasswordMatch = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);
