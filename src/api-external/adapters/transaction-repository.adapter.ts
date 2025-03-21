import { TransactionExternalRepository } from '../ports/transaction.repository';
import { TransactionExternal } from '../core/domain/transaction-entity';
import { ResultTransactionExternal } from '../core/domain/result-transaction.entity';
import { ApiExternalService } from '../api-external.service';

export class TransactionExternalRepositoryAdapter
  implements TransactionExternalRepository
{
  constructor(private readonly apiExternalService: ApiExternalService) {}

  async createTransaction(
    transaction: TransactionExternal,
  ): Promise<ResultTransactionExternal> {
    const result =
      await this.apiExternalService.createTransactionExternal(transaction);
    return result;
  }
}
