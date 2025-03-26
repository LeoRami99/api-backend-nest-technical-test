import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @Post('/')
  createTransaction(@Body() createTransactionDTO: CreateTransactionDto) {
    return this.transactionsService.createTransaction(
      createTransactionDTO.transaction,
      createTransactionDTO.token_card,
      createTransactionDTO.acceptance_token,
      createTransactionDTO.installments,
    );
  }
  @Get('/:id')
  getTransactionById(@Param('id') id: string) {
    return this.transactionsService.getTransactionById(id);
  }
}
