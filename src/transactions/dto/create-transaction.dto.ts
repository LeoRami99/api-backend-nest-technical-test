import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TransactionDataDto {
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

export class CreateTransactionDto {
  @ValidateNested()
  @Type(() => TransactionDataDto)
  @IsNotEmpty()
  transaction: TransactionDataDto;

  @IsNotEmpty()
  @IsString()
  token_card: string;

  @IsNotEmpty()
  @IsString()
  acceptance_token: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  installments: number;
}
