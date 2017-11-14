import * as http from 'http';
import * as browserSync from 'browser-sync';
import { UrilRouter } from './util';
import { DB, IDB } from './db';

import { AppSampleAPI } from './implement/app/sample.api';
import { AppSampleDetailAPI } from './implement/app/sample.detail.api';

let DB_BASE: IDB = new DB();
let uril = new UrilRouter(DB_BASE);

/**
 * 先頭から順に部分一致で処理される
 * 子要素は先頭に記載すること
 */
export const MOCK_API: Array<browserSync.PerRouteMiddleware | browserSync.MiddlewareHandler> = [
  // apis
  uril.addHeaderParameter(),
  ...uril.createRegexpAppApi('sample/*[0-9a-zA-Z-]+', 'sample/:id', AppSampleDetailAPI),
  ...uril.createAppApi('sample', AppSampleAPI),
  uril.apis(), // uril.apis() to put it at the end
];
