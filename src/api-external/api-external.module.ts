import { Module } from '@nestjs/common';
import { ApiExternalService } from './api-external.service';
import { ApiExternalController } from './api-external.controller';
import { HttpModule } from '@nestjs/axios';
import { CardRepositoryAdapter } from './adapters/card-repository.adapter';
import { TransactionExternalRepositoryAdapter } from './adapters/transaction-repository.adapter';

@Module({
  imports: [HttpModule],
  controllers: [ApiExternalController],
  providers: [
    ApiExternalService,
    {
      provide: 'CardRepository',
      useClass: CardRepositoryAdapter,
    },
    {
      provide: 'TransactionExternalRepository',
      useClass: TransactionExternalRepositoryAdapter,
    },
  ],
  exports: [
    ApiExternalService,
    'CardRepository',
    'TransactionExternalRepository',
  ],
})
export class ApiExternalModule {}
