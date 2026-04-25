import { IUser } from "../../models/user.model";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  updateByEmail(email: string, data: Partial<IUser>): Promise<IUser | null>;
  create(data: Partial<any>): Promise<any>
  findById(id: string): Promise<any | null>
}