import { Inject, Injectable } from '@nestjs/common';
import { WebhookRepository } from './ports/weebhook.repository';
import { Webhook } from './core/domain/webhook-entity';
import { TransactionsService } from '../transactions/transactions.service';
import { ProductsService } from '../products/products.service';
@Injectable()
export class WebhookService {
  constructor(
    @Inject('WebhookRepository')
    private readonly webhookRepository: WebhookRepository,
    private readonly transactionService: TransactionsService,
    private readonly productsService: ProductsService,
  ) {}

  async updateInternalTransactionService(webhook: Webhook): Promise<Webhook> {
    try {
      const response =
        await this.transactionService.updateInternalByExternalTransaction(
          webhook.data.transaction.id,
          webhook.data.transaction.status.toLowerCase(),
        );

      if (webhook.data.transaction.status.toLowerCase() === 'approved') {
        try {
          const transaction =
            await this.transactionService.getTransactionByIdInternal(
              webhook.data.transaction.reference,
            );

          if (transaction) {
            const updated = await this.productsService.updateStockService(
              transaction.productId,
              transaction.amount,
            );

            if (!updated) {
              console.warn(
                'No se pudo actualizar el stock (stock insuficiente o producto no encontrado)',
              );
            }
          }
        } catch {
          console.error('Error actualizando stock o transacción:');
        }
      }
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
