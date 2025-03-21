import { ResultTransactionExternal } from '../core/domain/result-transaction.entity';
import { TransactionExternal } from '../core/domain/transaction-entity';

export interface TransactionExternalRepository {
  createTransaction(
    transaction: TransactionExternal,
  ): Promise<ResultTransactionExternal>;
}
