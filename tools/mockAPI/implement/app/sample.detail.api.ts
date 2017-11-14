import * as http from 'http';
import { ApiType, IDB, IApiClass, BaseAPI } from '../util';

export class AppSampleDetailAPI extends BaseAPI implements IApiClass {

    constructor(public DB: IDB, private uri: string, private type: ApiType) {
        super(DB, uri, type);
    }

    public get(req: http.IncomingMessage, res: http.ServerResponse, next: Function): void {
        super.resultJSON(req, res, next);
    }
}
