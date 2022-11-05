/**
1. incoming request
2. middleware
3. guard
4. interceptor (= pre-controller)
5. pipes
6. controller
7. service (if exist)
8. interceptor (= pose-request)
9. exception filters 
10. server response
*/

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // data == return value of controller (post process)
    return next.handle().pipe(map((data) => ({ success: true, data })));
  }
}
