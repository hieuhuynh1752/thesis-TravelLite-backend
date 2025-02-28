export enum UserRoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}
export interface User {
  id: number;
  email: string;
  name?: string;
  password: string;
  role: UserRoleType;
  createAt: Date;
}
