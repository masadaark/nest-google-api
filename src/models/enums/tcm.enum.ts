export class TcmEnum {
  private static _sheetIgnore: string[] = [
    'Use Case',
    'Example TCM',
    'Form TestCase',
    'Testplan Overview',
    'overview',
    'config',
  ];
  private static _refRow = {
    scenarioName: 'Area of Testing (Test Scenario)',
    testcaseName: 'Test Case',
    endPoint: 'Remark',
  };
  static get sheetIgnore(): string[] {
    return this._sheetIgnore;
  }
  static get refRow() {
    return this._refRow;
  }
}
