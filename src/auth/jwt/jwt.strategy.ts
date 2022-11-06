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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // request에서 JWT 추출 방법
      secretOrKey: process.env.SECRET_KEY, // 토큰을 서명할 키
      ignoreExpiration: false, // false : 만료시 에러 처리를 passport에게 위임
    });
  }

  // 1. Passport는 PassportStrategy를 통해 JWT 서명을 검증하고, Payload의 JSON을 파싱한다.
  // 2. 파싱한 JSON을 인자로하여 validate를 호출한다.
  // 3. validate에서 반환된 값은 request.user 프로퍼티로 설정된다.
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findByIdWithoutPassword(payload.sub);
    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('잘못된 접근입니다.');
    }
  }
}
