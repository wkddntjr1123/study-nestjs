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

  async findByEmail(email: string) {
    return await this.catsModel.findOne({ email });
  }
}
