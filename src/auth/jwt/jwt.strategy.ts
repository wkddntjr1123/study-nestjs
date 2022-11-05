import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRepository } from 'src/cats/cats.repository';
import { Payload } from './jwt.payload';

Injectable();
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // 음... DI가 undefined되서 확인해보니 순환 참조 때문인듯. https://docs.nestjs.com/fundamentals/circular-dependency
    @Inject(forwardRef(() => CatsRepository))
    private readonly catsRepository: CatsRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findByIdWithoutPassword(payload.sub);
    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('잘못된 접근입니다.');
    }
  }
}
