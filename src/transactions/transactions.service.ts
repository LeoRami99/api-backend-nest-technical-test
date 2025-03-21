import { HttpStatus, Inject, Injectable, HttpException } from '@nestjs/common';
import { TransactionRepository } from './ports/transaction.repository';
import { Transaction } from './core/domain/transaction.entity';
import { ApiExternalService } from '../api-external/api-external.service';

import { hash256Signature } from '../utils/hash256';
import { getEnvs } from '../config/config.envs';
import { ConfigService } from '@nestjs/config';

import { convertToCents } from '../utils/convertToCents';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
    private readonly apiExternalService: ApiExternalService,
    private readonly configService: ConfigService,
  ) {}

  async createTransaction(
    transaction: Transaction,
    token_card: string,
    acceptance_token: string,
    installments: number,
  ): Promise<Transaction> {
    try {
      // Obtener variables de entorno
      const envs = getEnvs(this.configService);
      const integrityKey = envs.INTEGRITY_KEY_SANDBOX as string;
      if (!integrityKey) {
        throw new Error('Integrity key not configured');
      }
      const priceCents = convertToCents(transaction.price);

      // Generar firma de seguridad
      const signature = await hash256Signature(
        transaction.productId,
        priceCents.toString(),
        'COP',
        integrityKey,
      );

      // Preparar payload para la transacción externa
      const externalPayload = {
        acceptance_token: acceptance_token,
        amount_in_cents: priceCents,
        currency: 'COP',
        signature: signature,
        reference: transaction.productId,
        customer_email: 'pruebasensandbox@yopmail.com',
        redirect_url: 'http://localhost:3000/redirect',
        payment_method: {
          type: 'CARD',
          installments: installments,
          token: token_card,
        },
      };

      const transactionDataExternal =
        await this.apiExternalService.createTransactionExternal(
          externalPayload,
        );
      if (!transactionDataExternal) {
        throw new Error('Transaction could not be created in external API');
      }
      console.log('transactionDataExternal', transactionDataExternal);

      const transactionData = await this.transactionRepository.create({
        ...transaction,
        idExternalTransaction: transactionDataExternal.data.id,
      });
      if (!transactionData) {
        throw new Error('Transaction could not be created in repository');
      }

      return transactionData;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        (error as Error).message || 'Could not create transaction',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
