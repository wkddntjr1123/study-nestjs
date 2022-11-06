import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.scheme';
import { CatsRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catsModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<{ _id: any } | null> {
    const result = await this.catsModel.exists({ email });
    return result;
  }

  async create(cat: CatsRequestDto): Promise<Cat> {
    return await this.catsModel.create(cat);
  }

  async findByEmail(email: string): Promise<Cat | null> {
    return await this.catsModel.findOne({ email });
  }

  async findByIdWithoutPassword(id: string): Promise<Cat | null> {
    return await this.catsModel.findOne({ id }).select('-password');
  }

  async findByIdAndUpdateImg(id: string, filename: string) {
    const cat = await this.catsModel.findById(id);
    if (!cat) {
      return false;
    }
    cat.imgUrl = filename;
    const newCat = await cat?.save();
    return newCat?.readonlyData;
  }
}
