import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return 'server is running...';
  }
}
