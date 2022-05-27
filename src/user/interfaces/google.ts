export interface GoogleIdToken {
  iss: string;
  sub: string;
  azp: string;
  aud: string;
  iat: string;
}

export interface GoogleProfile {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
}
