import {MongoClient, MongoClientOptions} from 'mongodb';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import {createDatabaseError, DatabaseError} from '../modules/errors';
import {pipe} from 'fp-ts/pipeable';
import {Lazy} from 'fp-ts/function';

export const databaseUri = 'mongodb://localhost:27017/localhost';

export const connectClient = (uri: string, options?: MongoClientOptions) =>
    TE.tryCatch<DatabaseError, MongoClient>(async () => MongoClient.connect(uri, options), createDatabaseError(`Get database client error.`));

export const getConnectedClient = (connection: E.Either<DatabaseError, MongoClient>): Lazy<O.Option<MongoClient>> => () =>
  pipe(connection, O.fromEither)
