import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from 'src/cats/cats.module';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }), // 인증 strategy 설정
    // register를 하니 환경변수 로딩 전에 @Module이 먼저 실행되서 안됌
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET_KEY,
        signOptions: { expiresIn: '1d' },
      }),
    }), // 로그인 시 사용 (generate jwt)
    forwardRef(() => CatsModule), // for DI  : catsRepository 순환 모듈 참조 해결
  ],
  providers: [AuthService, JwtStrategy], // JwtStrategy의 JwtService DI 가능
  exports: [AuthService],
})
export class AuthModule {}
