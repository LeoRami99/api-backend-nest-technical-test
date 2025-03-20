import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { getEnvs } from '../config/config.envs';

@Injectable()
export class ApiExternalService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getDataMerchants(): Promise<Record<string, unknown>> {
    try {
      const envs = getEnvs(this.configService);
      const url = envs.API_EXTERNAL_URL_SANDBOX;
      const publicKey = envs.PUBLIC_KEY_SANDBOX;
      const uri = `${url}/merchants/${publicKey}`;

      const response = await firstValueFrom(
        this.httpService.get<Record<string, unknown>>(uri),
      );
      return response.data;
    } catch {
      throw new Error('Could not get data from external API');
    }
  }
}
