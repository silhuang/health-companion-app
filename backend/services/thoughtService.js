import { ObjectId } from 'mongodb';
import { getDB } from '../config/database.js';

export class ThoughtService {
  get collection() {
    return getDB().collection('thoughts');
  }

  async create(thoughtData) {
    const thought = {
      ...thoughtData,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await this.collection.insertOne(thought);
    return { ...thought, _id: result.insertedId };
  }

  async findAll() {
    return await this.collection.find({}).sort({ createdAt: -1 }).toArray();
  }

  async findById(id) {
    try {
      const objectId = new ObjectId(id);
      return await this.collection.findOne({ _id: objectId });
    } catch (error) {
      return null;
    }
  }

  async update(id, updateData) {
    try {
      const objectId = new ObjectId(id);
      const result = await this.collection.updateOne(
        { _id: objectId },
        {
          $set: {
            ...updateData,
            updatedAt: new Date()
          }
        }
      );

      if (result.matchedCount === 0) {
        return null;
      }

      return await this.findById(id);
    } catch (error) {
      return null;
    }
  }

  async delete(id) {
    try {
      const objectId = new ObjectId(id);
      const result = await this.collection.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }
}