import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from './ports/transaction.repository';
import { Transaction } from './core/domain/transaction.entity';
import { ApiExternalService } from '../api-external/api-external.service';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
    private readonly apiExternalService: ApiExternalService,
  ) {}

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    const data = await this.apiExternalService.getDataMerchants();
    console.log(data.data);
    const transactionData =
      await this.transactionRepository.create(transaction);
    if (!transactionData) {
      throw new Error('Transaction could not be created');
    }
    return transactionData;
  }
}
