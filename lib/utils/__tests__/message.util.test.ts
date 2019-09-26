import { DATE_PARTITION_FORMAT, createDatePartition } from '../message.util';

describe('message.util', () => {
  it('# should create correct format date string', () => {
    const partitionKey = createDatePartition();
    expect(partitionKey.length).toEqual(DATE_PARTITION_FORMAT.length);
  });
});
