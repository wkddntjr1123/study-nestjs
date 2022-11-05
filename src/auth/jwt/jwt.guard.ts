import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 유저로부터 JWT header에 실려서 요청이 오면 guard를 통해 검사 => jwt strategy 실행
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
