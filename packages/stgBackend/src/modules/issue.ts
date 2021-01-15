import * as t from 'io-ts';
import {ObjectID} from 'mongodb';

export const issueName = t.brand(
    t.string,
    (
        n,
    ): n is t.Branded<
        string,
        {
            readonly issueName: unique symbol;
        }
    > => n.length > 2 && n.length < 50,
    'issueName',
);

export const issueDesc = t.brand(
    t.string,
    (
        n,
    ): n is t.Branded<
        string,
        {
            readonly issueDesc: unique symbol;
        }
    > => n.length > 5 && n.length < 100,
    'issueDesc',
);

const objectId = new t.Type<ObjectID, ObjectID, any>(
    'objectId',
    (input: any): input is ObjectID => ObjectID.isValid(input),
    (input, context) => (ObjectID.isValid(input) ? t.success(input) : t.failure(input, context)),
    t.identity,
);

export const issueRaw = t.interface({
    _tag: t.literal('issueRaw'),
    _id: objectId,
    name: issueName,
    desc: issueDesc,
});

export const issuePopulated = t.interface({
    _tag: t.literal('issuePopulated'),
    _id: objectId,
    name: issueName,
    desc: issueDesc,
});
