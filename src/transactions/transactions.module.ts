import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionModel } from '../models/transaction.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeTransactionRepositoryAdapter } from './adapters/sequelize-transaction.repository.adapter';

@Module({
  imports: [SequelizeModule.forFeature([TransactionModel])],
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
