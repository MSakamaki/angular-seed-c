
import { Map } from 'immutable';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { fixtureConfig } from './_fixture/config';
/**
 * やらないといけないこと
 * 1. 初期データのロード
 * 2. データの検索
 * 3. データの設定
 */
export class DB implements IDB {

  /**
   * Immutable.Map()
   */
  private DATA = Map();

  /**
   * JSONデータ用Prefix RegExp
   */
  private JsonRxp = new RegExp('\.json$');

  /**
   * Load initialize data;
   */
  constructor() {
    this.readFixture(fixtureConfig.APP.PATH, fixtureConfig.APP.prefix)
      .forEach((fixtre) => this.setFixtureData(fixtre));
  }

  /**
   * searchd data
   * @param apiKey 取得するキー
   */
  public search(apiKey: string): Promise<any> {
    return Promise.resolve(this.DATA.get(apiKey));
  }

  /**
   * 指定したAPIキーのデータを再読込する
   */
  public reload(apiKey: string): Promise<any> {
    return new Promise((resolve, reject) => {

      let updateAPIs: any[] = [
        ...this.readFixture(fixtureConfig.APP.PATH, fixtureConfig.APP.prefix)
          .filter((data: any) => data.API_KEY === apiKey),
      ];

      if (updateAPIs.length === 1) {
        this.DATA = this.DATA.set(apiKey, updateAPIs[0].data);
        resolve();
      }
    });
  }

  /**
   * update data
   * @param apiKey 保存するキー
   * @param data 保存する情報
   */
  public create(apiKey: string, data: any): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.DATA = this.DATA.set(apiKey, data);
      resolve();
    });
  }

  private loadFixture(fullpath: any): {} {
    return JSON.parse(readFileSync(fullpath, 'utf-8'));

  }

  private setFixtureData(fixture: any): void {
    this.DATA = this.DATA
      .set(fixture.API_KEY, fixture.data)
      .set(`${fixture.API_KEY}.name`, fixture.API_NAME);
  }

  private upgradeAppPrefix(fixture: any, app: string): {} {
    fixture.API_KEY = `${app}.${fixture.API_KEY}`;
    return fixture;
  }

  private readFixture(PATH: string, prefix: string) {
    return readdirSync(PATH)
      .filter((file: string) => this.JsonRxp.test(file))
      .map((files) => this.upgradeAppPrefix(this.loadFixture(join(PATH, files)), prefix));
  }

}


export interface IDB {
  reload(apiKey: string): Promise<any>;
  search(apiKey: string): Promise<{}>;
  create(apiKey: string, data: object): Promise<{}>;
}
