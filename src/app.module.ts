// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module'; // Asegúrate de importar tus modelos
import { ApiExternalModule } from './api-external/api-external.module';
import { getEnvs } from './config/config.envs';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: getEnvs(configService).DB_HOST,
        port: getEnvs(configService).DB_PORT,
        username: getEnvs(configService).DB_USER,
        password: getEnvs(configService).DB_PASS,
        database: getEnvs(configService).DB_NAME,
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    ProductsModule,
    TransactionsModule,
    ApiExternalModule,
  ],
})
export class AppModule {}
