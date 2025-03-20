import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from './ports/transaction.repository';
import { Transaction } from './core/domain/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    const transactionData =
      await this.transactionRepository.create(transaction);
    if (!transactionData) {
      throw new Error('Transaction could not be created');
    }
    return transactionData;
  }
}
