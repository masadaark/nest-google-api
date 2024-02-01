import { Controller, Get, Param } from '@nestjs/common';
import { GoogleApiService } from '../services/oauth.service';
import { GsRefeshTokenModel, GsSheetNameModel } from 'src/models/oauth.model';

@Controller('api/google')
export class GoogleController {
  constructor(private readonly googleService: GoogleApiService) {}
  @Get('/token')
  async getGsToken(): Promise<GsRefeshTokenModel> {
    return this.googleService.Token();
  }
  @Get('/sheetNames/:sheetId')
  async getGsNames(@Param() params: any): Promise<GsSheetNameModel> {
    return this.googleService.SheetNames(params.sheetId);
  }
}
