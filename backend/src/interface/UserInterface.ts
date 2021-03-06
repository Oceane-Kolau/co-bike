export interface UserInterface {
  username: string;
  password: string;
  isAdmin: boolean;
  id: string;
  googleId?: string;
  email: string;
  token?: string;
}

export interface PublicUserInterface {
  username: string;
  isAdmin: boolean;
  id: string;
  googleId?: string;
  email: string;
  token?: string;
}
