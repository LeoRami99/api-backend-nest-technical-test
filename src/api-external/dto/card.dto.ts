import { IsString, IsNotEmpty } from 'class-validator';

//  public number: number,
// public cvc: number,
// public exp_month: number,
// public exp_year: number,
// public card_holder: string,

export class GetDataCardDto {
  @IsString()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  cvc: number;

  @IsString()
  @IsNotEmpty()
  exp_month: number;

  @IsString()
  @IsNotEmpty()
  exp_year: number;

  @IsString()
  @IsNotEmpty()
  card_holder: string;
}
