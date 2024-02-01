import { Injectable } from '@nestjs/common';
import { TcmEnum } from 'src/models/enums/tcm.enum';
import { TcmScenario, TcmSheetModel } from 'src/models/tcm/tcm_v1.model';
import { GoogleApiService } from 'src/services/oauth.service';

@Injectable()
export class TcmV1Flow {
  constructor(private readonly googleService: GoogleApiService) {}
  async tcDetail(sheetId: string): Promise<TcmSheetModel> {
    const sheet = await this.googleService.SheetNames(sheetId);
    const respSheet: TcmSheetModel = {
      fileName: sheet.fileName,
      sheets: [],
    };
    for (const sheetName of sheet.sheetNames) {
      if (
        !TcmEnum.sheetIgnore.includes(sheetName) &&
        /^Module:(.+)-Feature:(.+)/.test(sheetName)
      ) {
        respSheet.sheets.push({
          name: sheetName,
          values: await this.googleService.GetSheetVal(sheetId, sheetName),
        });
      }
    }
    return respSheet;
  }
  async scenarioDetail(sheetId: string): Promise<TcmScenario[]> {
    const sheet = await this.tcDetail(sheetId);
    const tcmResult: TcmScenario[] = [];
    for (const scenarioSheet of sheet.sheets) {
      let scenarioName: string = '';
      const feature = {
        featureName: scenarioSheet.name.split('Feature:')[1],
        scenarios: [],
      };
      scenarioSheet.values.forEach((row) => {
        if (row[0] === TcmEnum.refRow.scenarioName) scenarioName = row[1];
        if (row[0] === TcmEnum.refRow.testcaseName)
          feature.scenarios.push({
            scenarioName: scenarioName,
            tcNames: row.filter(
              (col) => !['Expect Result', 'Actual Result', ''].includes(col),
            ),
          });
      });
      tcmResult.push(feature);
    }
    return tcmResult;
  }
}
