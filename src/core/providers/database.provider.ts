import { DataSource } from 'typeorm';

import { databaseConfig } from 'src/core/config/database';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        ...{
          type: 'mysql',
          host: process?.env?.DATABASE_HOST || '',
          port:
            parseInt(process?.env?.DATABASE_PORT || '3306', 10) ||
            databaseConfig.DEFAULT_PORT,
          username: process?.env?.DATABASE_USER || '',
          password: process?.env?.DATABASE_PASS || '',
          database: 'test',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        },
        ...(process?.env?.DATABASE_URL
          ? { url: process?.env?.DATABASE_URL }
          : {}),
      });

      return dataSource.initialize();
    },
  },
];
