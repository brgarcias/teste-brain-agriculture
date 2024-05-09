import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    database: configService.get('DATABASE_DB'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/typeorm/migrations/*{.ts,.js}'],
    migrationsRun: true,
    ssl: configService.get('APP_ENV') !== 'Development',
    synchronize: true,
    autoLoadEntities: true,
    applicationName: 'teste-brain-agriculture',
  }),
  inject: [ConfigService],
};
