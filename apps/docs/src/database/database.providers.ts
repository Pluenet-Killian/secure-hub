import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'mongoose_service',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/secure-bd'),
  },
];