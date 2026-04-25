import { Model, Document } from "mongoose";

export abstract class BaseRepository<T extends Document> {
  protected constructor(protected model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async getAll(): Promise<T[]> {
    return this.model.find();
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    return this.model.findOne(filter as any);
  }

  async findMany(filter: Partial<T>): Promise<T[]> {
    return this.model.find(filter as any);
  }

  async updateOne(filter: Partial<T>, data: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(filter as any, data, { new: true });
  }
}
