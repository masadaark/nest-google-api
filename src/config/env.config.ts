import * as fs from 'fs';
import { EnvCfgModel } from 'src/models/env.model';
class CfgClass {
  private static _ENV: EnvCfgModel;
  static async Init(): Promise<void> {
    const path: string = `./src/env/local.json`;
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (readFileErr, data) => {
        if (readFileErr) {
          reject(readFileErr);
        } else {
          try {
            this._ENV = JSON.parse(data) as EnvCfgModel;
            resolve();
          } catch (parseError) {
            reject(parseError);
          }
        }
      });
    });
  }
  static get ENV(): EnvCfgModel {
    return this._ENV;
  }
}

export default CfgClass;
