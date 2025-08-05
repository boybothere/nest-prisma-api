import { User } from "generated/prisma";

export type LoginUserType = Pick<User, 'username' | 'password'>