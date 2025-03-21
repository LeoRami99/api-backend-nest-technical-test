import { ResultTransactionExternal } from '../core/domain/result-transaction.entity';

export interface ApiTransactionExternalResult
  extends ResultTransactionExternal {
  created_at: string;
}
