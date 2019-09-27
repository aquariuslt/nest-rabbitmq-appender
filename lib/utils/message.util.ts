import { format } from 'date-fns';

export const DATE_PARTITION_FORMAT = 'yyyyMMdd';
export const createDatePartition = () => format(new Date(), DATE_PARTITION_FORMAT);
