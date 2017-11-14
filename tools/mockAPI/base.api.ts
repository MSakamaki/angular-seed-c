
import * as http from 'http';
import { DB, IDB } from './db';
import { ApiType } from './util';
import { fixtureConfig } from './_fixture/config';

export interface IApiClass {

    get(req: http.IncomingMessage, res: http.ServerResponse, next: Function): void;
    post(req: http.IncomingMessage, res: http.ServerResponse, next: Function): void;
    put(req: http.IncomingMessage, res: http.ServerResponse, next: Function): void;

    debug_get(req: http.IncomingMessage, res: http.ServerResponse, next: Function): void;
    debug_put(req: http.IncomingMessage, res: http.ServerResponse, next: Function): void;

}

export interface DevApiStatus {
    status: number;
    wait: number;
    data: any;
    name: string;
    type: ApiType;
}

export class BaseAPI implements IApiClass {

    /** fixutre用、APIの基本キー */
    public API_KEY: string;
    /** api　レスポンスコード(wait, http status) (apiキー + .status) */
    public DEV_API_KEY: string;
    /** fixture data  (apiキー + .name)*/
    public NAME_API_KEY: string;

    /**
     * ローカルデータを取得する
     */
    get data(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            resolve(this.DB.search(this.API_KEY));
        });
    }

    /**
     * コンストラクタ
     * @param DB DBクラス
     * @param api API文字列
     * @param apiType APIタイプ(/app)
     */
    constructor(public DB: IDB, private apiUrl: string, private apiType: ApiType) {
        let apiPrefix: string;
        switch (this.apiType) {
            case ApiType.API:
            default:
                apiPrefix = fixtureConfig.APP.prefix;
                break;
        }

        this.API_KEY = `${apiPrefix}.${apiUrl}`;
        this.DEV_API_KEY = `${this.API_KEY}.status`;
        this.NAME_API_KEY = `${this.API_KEY}.name`;
        /** default api status */
        this.DB.create(this.DEV_API_KEY, {
            status: 200,
            wait: 0
        });
    }

    public get(req: http.IncomingMessage, res: http.ServerResponse, next: Function) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.end(JSON.stringify({
            ERROR_MESSAGE: 'GET NOT FOUND'
        }));
    }

    public post(req: http.IncomingMessage, res: http.ServerResponse, next: Function) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.end(JSON.stringify({
            ERROR_MESSAGE: 'POST NOT FOUND'
        }));
    }

    public put(req: http.IncomingMessage, res: http.ServerResponse, next: Function) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.end(JSON.stringify({
            ERROR_MESSAGE: 'PUT NOT FOUND'
        }));
    }

    public delete(req: http.IncomingMessage, res: http.ServerResponse, next: Function) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.end(JSON.stringify({
            ERROR_MESSAGE: 'DELETE NOT FOUND'
        }));
    }

    /**
     * 開発ステータスを返却する
     */
    public debug_get(req: http.IncomingMessage, res: http.ServerResponse, next: Function) {
        this.getDevelopState().then(status => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(status));
        }).catch(e => console.log('e', e));
    }

    /**
     * 開発ステータスを設定する
     * @param req
     * @param res
     * @param next
     */
    public debug_put(req: http.IncomingMessage, res: http.ServerResponse, next: Function) {
        this.getBody(req).then(body => {
            let jsonBody: any = JSON.parse(body);
            let data = jsonBody.data;

            this.DB.create(this.API_KEY, data)
                .then(() => this.setDevelopStatus(jsonBody.status, jsonBody.wait, data))
                .then(result => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                        RESULT: 'SET DATA',
                    }));
                });
        });

    }
 
    /**
     * 開発ステータスを設定する
     * @param req
     * @param res
     * @param next
     */
    public debug_delete(req: http.IncomingMessage, res: http.ServerResponse, next: Function) {
        this.DB.reload(this.API_KEY)
            .then(() => this.data)
            .then(data => this.setDevelopStatus(200, 0, data))
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    RESULT: 'RESET DATA',
                }));
            });
    }

    /**
     * HTTPリクエストのbodyパラメーターを取得して返却する。
     * @param req
     */
    public getBody(req: http.IncomingMessage): Promise<string> {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('readable', () => {
                body += req.read() || '';
            });
            req.on('end', () => {
                resolve(body);
            });
            req.on('error', reject);
        });
    }

    /**
     * ステータスコード200のみを返す
     * @param req
     * @param res
     * @param next
     * @param statusCode 返却したいhttpステータスコード(任意)
     */
    nomaryResult(req: http.IncomingMessage, res: http.ServerResponse, next: Function, statusCode?: number) {
        res.statusCode = statusCode || 200;
        res.end();
    }

    /**
     * ローカルデータに引数のデータを追加する
     * @param obj 追加するObject (fixutre.dataがArrayでない場合は例外を投げる)
     */
    protected pushDB(obj: Object): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let data = await this.DB.search(this.API_KEY);
            if (Array.isArray(data)) {
                data.push(obj);
                this.DB.create(this.API_KEY, data).then(resolve);
            } else {
                reject(`${this.API_KEY} of data is not an Array`);
            }
        });
    }

    /**
     * ローカルデータを初期化する
     * @param data 初期化用ローカルデータ、指定がない場合fixtureのデータを再ロードする。
     */
    // protected resetDB(data?: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         if (data) {
    //             this.DB.create(this.API_KEY, data).then(resolve);
    //         } else {
    //             this.DB.reload(this.API_KEY).then(resolve);
    //         }
    //     });
    // }

    /**
     * APIにローカルに保持したデータを返却する
     * @param req
     * @param res
     * @param next
     */
    public resultJSON(req: http.IncomingMessage, res: http.ServerResponse, next: Function): Promise<any> {
        let resJSON = async (resolve: Function, reject: Function) => {
            let data = await this.DB.search(this.API_KEY);
            let appParam = await this.getDevelopState();

            setTimeout(() => {
                res.statusCode = appParam.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                resolve();
            }, appParam.wait);
        };

        return new Promise(resJSON);
    }

    /**
     * 画面に意図したデータを返却する
     * @param req
     * @param res
     * @param next
     * @param json
     */
    public resultCustomJSON(req: http.IncomingMessage, res: http.ServerResponse, next: Function, json: any): Promise<any> {

        let resJSON = async (resolve: Function, reject: Function) => {
            let appParam = await this.getDevelopState();

            setTimeout(() => {
                res.statusCode = appParam.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(json));
                resolve();
            }, appParam.wait);
        };

        return new Promise(resJSON);
    }

    /**
     * ステータス返却
     */
    public getDevelopState(): Promise<DevApiStatus> {
        return Promise.all([
            this.DB.search(this.DEV_API_KEY),
            this.DB.search(this.API_KEY),
            this.DB.search(this.NAME_API_KEY),
        ]).then((results: any): DevApiStatus => ({
            wait: results[0].wait,
            status: results[0].status,
            data: results[1],
            name: results[2],
            type: this.apiType,
        }));
    }

    /**
     * ステータスのセット
     * @param status HTTPステータス
     * @param wait APIの待機時間
     */
    public setDevelopStatus(status: number, wait: number, data: any): Promise<any> {
        let setDevParam = async (resolve: any, reject: any) => {
            let apiDATA = await this.getDevelopState();
            if (this.NotUndefined(status)) {
                apiDATA.status = status;
            }
            if (this.NotUndefined(wait)) {
                apiDATA.wait = wait;
            }
            this.DB.create(this.DEV_API_KEY, apiDATA).then(resolve);
        };
        return new Promise(setDevParam);
    }

    /**
     * undefinedかどうかを確認する
     * @param param 確認するパラメータ
     */
    private NotUndefined(param: any): boolean {
        return 'undefined' !== typeof param;
    }
}
