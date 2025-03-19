import { Model, Column, Table, DataType } from 'sequelize-typescript';
@Table({
  tableName: 'transactions',
  timestamps: true,
})
class Transaction extends Model<Transaction> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;
  @Column
  userId: string;
}

export { Transaction };
