import { Controller } from '@nestjs/common';
import { ApiExternalService } from './api-external.service';

@Controller('api-external')
export class ApiExternalController {
  constructor(private readonly apiExternalService: ApiExternalService) {}
}
