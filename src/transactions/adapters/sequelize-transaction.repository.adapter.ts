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
  async updateInternalByExternalId(
    idExternalTransaction: string,
    status: string,
  ): Promise<TransactionModel> {
    await this.transactionModel.update(
      { status },
      { where: { idExternalTransaction } },
    );

    const transaction = await this.transactionModel.findOne({
      where: { idExternalTransaction },
    });

    if (!transaction) {
      throw new Error(`Transaction with id ${idExternalTransaction} not found`);
    }

    return transaction;
  }
}
