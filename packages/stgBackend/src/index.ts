import {ExpressConfig, server} from './server/Server';
import {pipe} from '../node_modules/fp-ts/lib/pipeable';
import {factory, logger} from './modules/common/logger';
// import {factory, hoffLogger} from './common/logger';
// tslint:disable-next-line
require('dotenv').config();

const {NODE_ENV} = process.env;
const DEV_MODE: boolean = NODE_ENV === 'DEVELOPMENT';

const log = logger(factory.getLogger('index'));

// ----------------------------------------------------------------------------------------------------
//  Init main scope
// ----------------------------------------------------------------------------------------------------
const main = () =>
    pipe(
        log.info('================================================================')(),
        log.info('=                    Untitled project backend                  ='),
        log.info('================================================================'),
        log.info(`>>> Spouštím v ${NODE_ENV} módu`),
        log.info(``),
        startServer,
    );

// ---------------------------------------------------------------------------------------------------
//  Start server
// ---------------------------------------------------------------------------------------------------
const startServer = async () => {
    const cfg: ExpressConfig = {
        devMode: DEV_MODE,
    };
    server.run(cfg);
};

// ---------------------------------------------------------------------------------------------------
//  Run
// ----------------------------------------------------------------------------------------------------
main();
