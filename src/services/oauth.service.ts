import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import CfgClass from 'src/config/env.config';
import { GsRefeshTokenModel, GsSheetNameModel } from 'src/models/oauth.model';
@Injectable()
export class GoogleApiService {
  async Token(): Promise<GsRefeshTokenModel> {
    try {
      const response = await axios.post(
        'https://www.googleapis.com/oauth2/v4/token',
        CfgClass.ENV.googleClient,
      );
      return response.data as GsRefeshTokenModel;
    } catch (error) {
      throw new HttpException('google token request failed.', 500);
    }
  }
  async SheetNames(sheetId: string): Promise<GsSheetNameModel> {
    const token = await this.Token();
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`,
        {
          headers: { Authorization: `Bearer ${token.access_token}` },
        },
      );
      return {
        fileName: response.data.properties.title,
        sheetNames: response.data.sheets.map((o) => o.properties.title),
      };
    } catch (error) {
      throw new HttpException('fail to get sheetNames', 400);
    }
  }
  async GetSheetVal(sheetId: string, sheetName: string): Promise<string[][]> {
    const token = await this.Token();
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}`,
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
      },
    );
    return response.data.values;
  }
}
