import { Model, Document } from "mongoose";
import { IBaseRepository } from "./interfaces/IBaseRepository";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(private model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async getAll():Promise<T[] | null>{
    return this.model.find();
  }
}
