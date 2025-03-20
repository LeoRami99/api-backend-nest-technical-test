export class Transaction {
  constructor(
    public amount: number,
    public userId: string,
    public methodPayment: string,
    public productId: string,
    public price: number,
    public id?: string,
    public status?: string,
  ) {}
}
