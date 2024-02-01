export interface TcmSheetModel {
  fileName: string;
  sheets: TcmSheet[];
}

interface TcmSheet {
  name: string;
  values: string[][];
}

export interface TcmScenario {
  scenarios: Scenario[];
  featureName: string;
}

interface Scenario {
  scenarioName: string;
  tcNames: string[];
}
