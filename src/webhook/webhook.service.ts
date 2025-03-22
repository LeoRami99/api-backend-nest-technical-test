import { Inject, Injectable } from '@nestjs/common';
import { WebhookRepository } from './ports/weebhook.repository';
import { Webhook } from './core/domain/webhook-entity';
import { TransactionsService } from 'src/transactions/transactions.service';
@Injectable()
export class WebhookService {
  constructor(
    @Inject('WebhookRepository')
    private readonly webhookRepository: WebhookRepository,
    private readonly transactionService: TransactionsService,
  ) {}

  async updateInternalTransactionService(webhook: Webhook): Promise<Webhook> {
    try {
      const response =
        await this.transactionService.updateInternalByExternalTransaction(
          webhook.data.transaction.id,
          webhook.data.transaction.status.toLowerCase(),
        );
      if (response) {
        return webhook;
      } else {
        throw new Error('Error updating transaction');
      }
    } catch {
      throw new Error('Error updating transaction');
    }
  }
}
