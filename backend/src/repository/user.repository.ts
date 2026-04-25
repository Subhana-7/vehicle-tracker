import { UserModel, IUser } from "../models/user.model";
import { BaseRepository } from "./base.repository";
import { IUserRepository } from "./interfaces/IUserRepository";

export class UserRepository
  extends BaseRepository<IUser>
  implements IUserRepository
{
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email });
  }

  async updateByEmail(
    email: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    return this.updateOne({ email }, data);
  }
}