import * as bodyParser from 'body-parser';
import * as express from 'express';
import {factory, logger} from '../modules/common/logger';
import {router} from '../modules/api';
import {MongoClient} from 'mongodb';
import {connectClient, databaseUri} from './connection';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import {DatabaseError} from '../modules/errors';
import {pipe} from 'fp-ts/function';

const log = logger(factory.getLogger('server'));

export interface ExpressConfig {
    readonly devMode: boolean;
}

let app: express.Express;
let dbClient: E.Either<DatabaseError, MongoClient>;

export const server = {
    run: async ({}: ExpressConfig) => {
        app = express();

        app.use(bodyParser.json({limit: '1mb'}));
        app.use(bodyParser.json(), (err: any, req: any, res: any, next: any) => {
            if (err) {
                throw new Error(err);
            } else {
                next();
            }
        });

        app.use('*', (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });

        app.get('/healthz', (_, res) => {
            res.sendStatus(200);
        });
        app.options('*', (req, res) => {
            res.send('');
        });

        app.use('/api', router);

        const PORT = process.env.PORT || 8080;
        app.listen(PORT, async () => {
            log.info(`server ready on port ${PORT}`)();
            dbClient = await pipe(
                connectClient(databaseUri, {useUnifiedTopology: true}),
                TE.map((client) => {
                    log.info('database client connected')();
                    return client;
                }),
                TE.mapLeft((err) => {
                    log.error(err.errorMessage)();
                    log.error(JSON.stringify(err.rawError))();
                    return err;
                }),
            )();
        });
    },
};
