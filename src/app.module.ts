import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { GoogleController } from './controller/google.controller';
import { GoogleApiService } from './services/oauth.service';
import { TcmController } from './controller/tcm.controller';
import { TcmV1Flow } from './business/flow/tcm_v1.flow';

@Module({
  imports: [],
  controllers: [AppController, GoogleController, TcmController],
  providers: [AppService, GoogleApiService, TcmV1Flow],
})
export class AppModule {}
