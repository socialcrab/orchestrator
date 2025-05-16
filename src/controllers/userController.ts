import { Request, Response } from 'express';
import { UserModel } from '../models/user/User';
import { config } from '../configs/config';
import { validateEmailInput } from '../library/common';
import { extractNameFromEmail } from '../helper/userHelper';
import { saveUser } from '../services/user/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import './configs/passport'; // Ensure you import the passport configuration

interface UserInput {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (req: Request, res: Response) => {
  let { username, email, password }: UserInput = req.body;
  if (!email || !password) return res.json({ status: 400, message: 'bad request' });

  const isValidEmail = validateEmailInput(email);
  if (!isValidEmail) return res.json({ status: 400, message: 'invalid email address' });
  if (!username) username = await extractNameFromEmail(email);

  const hashedPassword = await bcrypt.hash(password, 10);
  const userInput = { username, email, password: hashedPassword };

  await saveUser(userInput);
  return res.json({ status: 200, message: 'user registered' });
};

export const loginUser = async (req: Request, res: Response) => {
  let { email, password }: { email: string; password: string } = req.body;
  if (!email || !password) return res.json({ status: 400, message: 'bad request' });

  const isValidEmail = validateEmailInput(email);
  if (!isValidEmail) return res.json({ status: 400, message: 'invalid email address' });

  const user = await UserModel.findOne({ email });
  if (!user) return res.json({ status: 400, message: 'user not found' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.json({ status: 400, message: 'invalid password' });

  const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });

  return res.json({ status: 200, data: { username: user.username, email: user.email, token } });
};
