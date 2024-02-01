import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Weather } from './weather/entities/weather.entity';

dotenvConfig({ path: '.env' });

export const dataSourceOptions = {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Weather],
  synchronize: false,
  migrations: [getMigrationDirectory()],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

function getMigrationDirectory() {
  const directory =
    process.env.NODE_ENV === 'migration' ? 'src' : `${__dirname}`;
  return `${directory}/migrations/**/*{.ts,.js}`;
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
