import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { SequelizeWebhookRepositoryAdapter } from './adapters/sequelize-webhook.repository.adapter';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TransactionsModule, ProductsModule],
  controllers: [WebhookController],
  providers: [
    WebhookService,
    {
      provide: 'WebhookRepository',
      useClass: SequelizeWebhookRepositoryAdapter,
    },
  ],
})
export class WebhookModule {}
