import {testService} from '../core/testService';

export const testGraphqlResolvers = {
    Queries: {
        test: () => ({
            test: () => testService().test(),
        }),
    },
}
