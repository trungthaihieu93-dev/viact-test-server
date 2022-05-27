import { DataSource, DataSourceOptions } from 'typeorm';

import { databaseConfig } from 'src/core/config/database';

const config: DataSourceOptions = {
  ...{
    type: 'mysql',
    host: databaseConfig.HOST || '',
    port: parseInt(databaseConfig.PORT || '3306', 10) || 3306,
    username: databaseConfig.USER || '',
    password: databaseConfig.PASS || '',
    database: 'test',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  },
  ...(databaseConfig.URL ? { url: databaseConfig.URL } : {}),
};

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(config);

      return dataSource.initialize();
    },
  },
];
