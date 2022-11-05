import { ConflictException, Injectable } from '@nestjs/common';
import { CatsRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';
@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatsRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new ConflictException(
        '해당 이메일을 가진 고양이는 이미 존재합니다.',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    // return virtual field
    return cat.readonlyData;
  }
}
