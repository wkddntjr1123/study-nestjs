import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { multerOptions } from 'src/common/utils/multer.options';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { Cat } from './cats.scheme';
import { CatsService } from './cats.service';
import { ReadonlyCatDto } from './dto/cat.response.dto';
import { CatsRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard) // guard가 인증 처리를 담당하고, 처리 결과를 req에 담는다.
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readonlyData;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '성공',
    type: ReadonlyCatDto,
  })
  @Post()
  async signup(@Body() body: CatsRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() loginData: LoginRequestDto) {
    return this.authService.jwtLogin(loginData);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseGuards(JwtAuthGuard) // token validate, get user info
  @UseInterceptors(FileInterceptor('image', multerOptions('cats')))
  @Post('upload')
  uploadCatImg(
    @CurrentUser() cat: Cat,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.catsService.uploadImg(cat, image);
  }
}
