import { DataSource } from 'typeorm';
import * as path from 'path';

import { databaseConfig } from 'src/core/config/database';

console.log(
  path.join(__dirname, '/../**/**.entity{.ts,.js}').replace('core/', ''),
);

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
          entities: [
            path
              .join(__dirname, '/../**/**.entity{.ts,.js}')
              .replace('core/', '')
              .replace('core\\', ''),
          ],
          synchronize: true,
        },
        ...(process?.env?.DATABASE_URL
          ? { url: process?.env?.DATABASE_URL }
          : {}),
        timezone: 'Z'
      });

      return dataSource.initialize();
    },
  },
];
