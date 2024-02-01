export interface GsRefeshTokenModel {
  access_token: string;
  expire_in: number;
  scope: string;
  token_type: string;
  id_token: string;
}

export interface GsSheetNameModel {
  fileName: string;
  sheetNames: string[];
}
