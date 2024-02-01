import { Controller, Get, Param } from '@nestjs/common';
import { TcmV1Flow } from 'src/business/flow/tcm_v1.flow';
import { TcmScenario, TcmSheetModel } from 'src/models/tcm/tcm_v1.model';

@Controller('api/tcm')
export class TcmController {
  constructor(private readonly tcmV1Flow: TcmV1Flow) {}
  @Get('/data/:sheetId')
  async getTcmData(@Param() params: any): Promise<TcmSheetModel> {
    return this.tcmV1Flow.tcDetail(params.sheetId);
  }
  @Get('/scenario/:sheetId')
  async getScenario(@Param() params: any): Promise<TcmScenario[]> {
    return this.tcmV1Flow.scenarioDetail(params.sheetId);
  }
}
