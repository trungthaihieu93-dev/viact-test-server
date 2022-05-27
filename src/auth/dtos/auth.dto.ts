import { IsEmail, IsNotEmpty } from 'class-validator';

import { LoginForm, RegisterForm } from '../interfaces/auth';

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
