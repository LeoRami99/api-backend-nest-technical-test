import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionModel } from '../models/transaction.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeTransactionRepositoryAdapter } from './adapters/sequelize-transaction.repository.adapter';
import { ApiExternalModule } from '../api-external/api-external.module';

@Module({
  imports: [SequelizeModule.forFeature([TransactionModel]), ApiExternalModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: 'TransactionRepository',
      useClass: SequelizeTransactionRepositoryAdapter,
    },
  ],
})
export class TransactionsModule {}
