import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { SequelizeWebhookRepositoryAdapter } from './adapters/sequelize-webhook.repository.adapter';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  imports: [TransactionsModule],
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
