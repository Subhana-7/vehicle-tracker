import { UserModel, IUser } from "../models/user.model";
import { BaseRepository } from "./base.repository";
import { IUserRepository } from "./interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async findById(id:string):Promise<IUser | null> {
    return UserModel.findById(id);
  }

  async create(data: Partial<IUser>): Promise<IUser> {
  return UserModel.create(data);
}

  async updateByEmail(
  email: string,
  data: Partial<IUser>
): Promise<IUser | null> {
  return UserModel.findOneAndUpdate(
    { email },
    data,
    { returnDocument: "after" }
  );
}
}