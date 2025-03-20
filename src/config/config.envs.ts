import { ConfigService } from '@nestjs/config';

export const getEnvs = (configService: ConfigService) => ({
  DB_HOST: configService.get<string>('DB_HOST'),
  DB_PORT: configService.get<number>('DB_PORT'),
  DB_USER: configService.get<string>('DB_USER'),
  DB_PASS: configService.get<string>('DB_PASS'),
  DB_NAME: configService.get<string>('DB_NAME'),

  // Varibales for API external
  API_EXTERNAL_URL_SANDBOX: configService.get<string>('UAT_SANDBOX_URL'),
  PUBLIC_KEY_SANDBOX: configService.get<string>('PUBLIC_KEY'),
  PRIVATE_KEY_SANDBOX: configService.get<string>('PRIVATE_KEY'),
});
