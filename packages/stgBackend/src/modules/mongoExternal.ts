import {Collection, Db, MongoClient, MongoClientOptions} from 'mongodb';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import {createDatabaseError, DatabaseError} from './errors';
import {iso, Newtype} from 'newtype-ts';

export interface ExternalMongoClientOptions extends Newtype<{readonly ExternalMongoClientOptions: unique symbol}, MongoClientOptions> {}
export interface InternalMongoClientOptions extends Newtype<{readonly InternalMongoClientOptions: unique symbol}, MongoClientOptions> {}

const isoExternalMongoClientOptions = iso<ExternalMongoClientOptions>();
const isoInternalMongoClientOptions = iso<InternalMongoClientOptions>();


export const getConnectedClient = (uri: string, options?: ExternalMongoClientOptions) =>
    TE.tryCatch<DatabaseError, MongoClient>(
        async () => MongoClient.connect(uri, isoExternalMongoClientOptions.unwrap(options)),
        createDatabaseError(`Get database client error.`),
    );

export const getDatabase = (name?: string) => (client: MongoClient) =>
    TE.tryCatch<DatabaseError, Db>(async () => client.db(name ? name : null), createDatabaseError(`Get database ${name} error.`));

export const getCollection = (name: string) => (database: Db) =>
    E.tryCatch<DatabaseError, Collection<any>>(() => database.collection(name), createDatabaseError(`Get database collection ${name} error.`));

