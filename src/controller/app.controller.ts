import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
// import CfgClass from '../config/env.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  root(): string {
    return this.appService.root();
  }

  // @Get('/env')
  // env(): any {
  //   return CfgClass.ENV;
  // }
}
