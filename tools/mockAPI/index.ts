import { MOCK_API } from './mock';

// Start the server
require('browser-sync')({
  //  server: './app'{
  middleware: MOCK_API,
  port: 3030,
  directory: true,
  startPath: 'debug.html', ///this.APP_BASE,
  open: false,
  //injectChanges: false,,
  https: {
    key: './tools/mockAPI/_ssl/dummy.key',
    cert: './tools/mockAPI/_ssl/dummy.crt'
  },
  server: {
    //baseDir: 'tools/mockAPI/public',
    baseDir: 'src/dummy',
    routes: {
      // [`${this.APP_BASE}${this.APP_SRC}`]: this.APP_SRC,
      // [`${this.APP_BASE}${this.APP_DEST}`]: this.APP_DEST,
      ['/node_modules']: 'node_modules',
      //[`${this.APP_BASE.replace(/\/$/, '')}`]: this.APP_DEST,
      // [`${this.APP_BASE}dev`]: `${this.DIST_DIR}/dummy`,
      // [`/dev/node_modules`]: 'node_modules',
    }
  }
});