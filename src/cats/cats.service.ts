import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  hiImCatService() {
    return "hi i'm cat service";
  }
}
