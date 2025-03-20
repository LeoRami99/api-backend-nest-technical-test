import { IsNumber, IsString, IsNotEmpty, Min, IsUUID } from 'class-validator';

/* public id: string,
    public amount: number,
    public status: string,
    public userId: string,
    public methodPayment: string,
    public productId: string,
    public price: number, */
export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  methodPayment: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1000)
  price: number;
}
