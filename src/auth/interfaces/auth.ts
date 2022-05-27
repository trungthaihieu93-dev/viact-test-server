export interface RegisterForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface ResetPasswordForm {
  email: string;
  oldPassword: string;
  newPassword: string;
}
