import { TransactionModel } from 'src/models/transaction.model';
import { Webhook } from '../core/domain/webhook-entity';

export interface WebhookRepository {
  updateInternalTransaction(webhook: Webhook): Promise<TransactionModel>;
}
