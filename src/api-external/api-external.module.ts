import { Module } from '@nestjs/common';
import { ApiExternalService } from './api-external.service';
import { ApiExternalController } from './api-external.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ApiExternalController],
  providers: [ApiExternalService],
  exports: [ApiExternalService],
})
export class ApiExternalModule {}
