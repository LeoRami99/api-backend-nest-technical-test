import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionModel } from '../../models/transaction.model';

@Injectable()
export class SequelizeTransactionRepositoryAdapter {
  constructor(
    @InjectModel(TransactionModel)
    private readonly transactionModel: typeof TransactionModel,
  ) {}

  async create(transaction: TransactionModel): Promise<TransactionModel> {
    return this.transactionModel.create(transaction);
  }
}
