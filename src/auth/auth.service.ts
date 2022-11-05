import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService, // @nestjs/jwt의 JwtModule에서 제공해주는 provider : jwt 만들 때 사용
  ) {}

  async jwtLogin(loginData: LoginRequestDto) {
    const { email, password } = loginData;

    const cat = await this.catsRepository.findByEmail(email);
    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const isPasswordMatched = await bcrypt.compare(password, cat.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { email: email, sub: cat.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
