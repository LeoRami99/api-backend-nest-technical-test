import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { getEnvs } from '../config/config.envs';
import { Card } from './core/domain/card-entity';

import { ApiCardResult } from './interfaces/api-card-result.interface';
import { ApiTransactionExternalResult } from './interfaces/api-transaction-result.interface';
import { TransactionExternal } from './core/domain/transaction-entity';
import { AxiosError } from 'axios';

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

  async getTokenCard(card: Card): Promise<ApiCardResult> {
    try {
      const envs = getEnvs(this.configService);
      const url = envs.API_EXTERNAL_URL_SANDBOX;
      const uri = `${url}/tokens/cards`;

      const response = await firstValueFrom(
        this.httpService.post<ApiCardResult>(uri, card, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${envs.PUBLIC_KEY_SANDBOX}`,
          },
        }),
      );
      return response.data;
    } catch {
      throw InternalServerErrorException;
    }
  }

  async createTransactionExternal(
    transaction: TransactionExternal,
  ): Promise<ApiTransactionExternalResult> {
    try {
      const envs = getEnvs(this.configService);
      const url = envs.API_EXTERNAL_URL_SANDBOX;
      const uri = `${url}/transactions`;

      const response = await firstValueFrom(
        this.httpService.post<ApiTransactionExternalResult>(uri, transaction, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${envs.PRIVATE_KEY_SANDBOX}`,
          },
        }),
      );
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.error(
        'Error in createTransactionExternal:',
        axiosError.response?.data || axiosError.message,
      );
      throw new HttpException(
        axiosError.response?.data || axiosError.message,
        axiosError.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
