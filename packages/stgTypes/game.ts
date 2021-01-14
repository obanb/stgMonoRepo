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
