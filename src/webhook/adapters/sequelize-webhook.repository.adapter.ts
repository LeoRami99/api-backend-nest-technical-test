import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionModel } from '../../models/transaction.model';
import { Webhook } from '../core/domain/webhook-entity';

@Injectable()
export class SequelizeWebhookRepositoryAdapter {
  constructor(
    @InjectModel(TransactionModel)
    private readonly transactionModel: typeof TransactionModel,
  ) {}

  async updateInternalTransaction(webhook: Webhook): Promise<TransactionModel> {
    await this.transactionModel.update(
      { status: webhook.data.transaction.status.toLowerCase() },
      { where: { idExternalTransaction: webhook.data.transaction.id } },
    );

    const transaction = await this.transactionModel.findOne({
      where: { idExternalTransaction: webhook.data.transaction.id },
    });

    if (!transaction) {
      throw new Error(
        `Transaction with id ${webhook.data.transaction.id} not found`,
      );
    }

    return transaction;
  }
}
