import { Transaction } from '../core/domain/transaction.entity';

export interface TransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
}
