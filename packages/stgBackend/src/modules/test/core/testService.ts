import {factory, logger} from '../../common/logger';
import {pipe} from 'fp-ts/pipeable';
import {databaseError} from '../../errors';

const log = logger(factory.getLogger('testService'));


export const testService = () => ({
    test: () => {
      const res = pipe({pes:'ffef'}, databaseError.decode)
    },
});
