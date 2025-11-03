export interface User {
  id: number;
  name: string;
  age: string;
  email: string;
  password: string;
}

export interface UserAuth {
  name: string;
  age: string;
  email: string;
  password: string;
  repeatPassword: string;
}
