import { IsEmail, IsNotEmpty } from 'class-validator';

import { LoginForm, RegisterForm, ResetPasswordForm } from '../interfaces/auth';

export class LoginFormDTO implements LoginForm {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RegisterFormDTO implements RegisterForm {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;
}

export class ResetPasswordFormDTO implements ResetPasswordForm {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  oldPassword: string;
}
