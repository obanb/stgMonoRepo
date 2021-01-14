import {pipe} from 'fp-ts/pipeable';
import {ApiError, coreError, DatabaseError, databaseError} from '../modules/errors';
import * as E from 'fp-ts/lib/Either';
import {constVoid} from 'fp-ts/function';
import {errorScenario, okScenario} from './utilts';

describe('Test of retry util', () => {
    it(`should test union coreError json structure [${okScenario}]`, async () => {
        const dbError: DatabaseError = {
            _tag: 'databaseError',
            errorMessage: 'message',
            rawError: {},
        };
        const res = pipe(
            dbError,
            coreError.decode,
            E.chainW((either) => E.right(either)),
            E.fold(constVoid, (e) => e),
        );
        expect(res).toBe(dbError);
    });
    it(`should test union coreError json structure [${errorScenario}]`, async () => {
        const dbError: ApiError = {
            _tag: 'apiError',
            errorMessage: 'message',
            rawError: {},
        };
        const res = pipe(
            dbError,
            coreError.decode,
            E.chainW((either) => E.right(either)),
            E.fold(constVoid, (e) => e),
        );
        expect(res).toBe(undefined);
    });
    it(`should test databaseError json structure [${errorScenario}]`, async () => {
        const dbError: DatabaseError = {
            _tag: 'wrongTag' as any,
            errorMessage: 'message',
            rawError: {},
        };
        const res = pipe(
            dbError,
            databaseError.decode,
            E.chainW((either) => E.right(either)),
            E.fold(constVoid, (e) => e),
        );
        expect(res).toBe(undefined);
    });
    it(`should test databaseError json structure [${okScenario}]`, async () => {
        const dbError: DatabaseError = {
            _tag: 'databaseError',
            errorMessage: 'message',
            rawError: {},
        };
        const res = pipe(
            dbError,
            databaseError.decode,
            E.chainW((either) => E.right(either)),
            E.fold(constVoid, (e) => e),
        );
        expect(res).toBe(dbError);
    });
});
