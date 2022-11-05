import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.scheme';
import { CatsRequestDto } from './dto/cats.dto.request';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async signUp(body: CatsRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      throw new ConflictException(
        '해당 이메일을 가진 고양이는 이미 존재합니다.',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    // return virtual field
    return cat.readonlyData;
  }
}
