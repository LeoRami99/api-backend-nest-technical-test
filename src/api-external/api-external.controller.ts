import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiExternalService } from './api-external.service';
import { GetDataCardDto } from './dto/card.dto';

@Controller('api-external')
export class ApiExternalController {
  constructor(private readonly apiExternalService: ApiExternalService) {}

  @Get('/merchants')
  async getDataMerchants() {
    return this.apiExternalService.getDataMerchants();
  }
  @Post('/token-card')
  async getTokenCard(@Body() card: GetDataCardDto) {
    return this.apiExternalService.getTokenCard(card);
  }
}
