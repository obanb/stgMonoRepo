import * as express from 'express';
import {pipe} from 'fp-ts/pipeable';
import * as H from 'hyper-ts';
import {toRequestHandler} from 'hyper-ts/lib/express';
import * as E from 'fp-ts/lib/Either';
import {failure} from 'io-ts/lib/PathReporter';
const router = express.Router();
import * as t from 'io-ts';

export const xlsxHeaderLine = t.interface({
    header: t.string,
    property: t.string,
});

export const mongoQueryInput = t.interface({
    query: t.unknown,
    collection: t.string,
    projection: t.interface({
        type: t.string,
        list: t.array(xlsxHeaderLine),
    }),
    config: t.interface({
        allowEmpty: t.boolean,
    }),
});

function badRequest(message: Error): H.Middleware<H.StatusOpen, H.ResponseEnded, never, void> {
    return pipe(
        H.status(H.Status.BadRequest),
        H.ichain(() => H.closeHeaders()),
        H.ichain(() => H.send(message.message)),
    );
}

type WithErrorRequest = typeof H.Status.BadRequest | typeof H.Status.BadGateway | typeof H.Status.InternalServerError;

const withErrorCode = (status: WithErrorRequest) => (message: Error) =>
    pipe(
        H.status(status),
        H.ichain(() => H.closeHeaders()),
        H.ichain(() => H.send(message.message)),
    );

const paramDecode = pipe(
    H.decodeBody(mongoQueryInput.decode),
    H.mapLeft((e) => new Error(failure(e).join('\n'))),
    H.ichain((body) =>
        pipe(
            H.status<Error>(H.Status.OK),
            H.ichain(() => H.json(body, E.toError)),
        ),
    ),
    H.orElse(withErrorCode(H.Status.BadRequest)),
);

router.route('/mongoquery').post(toRequestHandler(paramDecode));

export {router};
