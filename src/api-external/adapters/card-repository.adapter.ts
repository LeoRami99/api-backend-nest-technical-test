import { CardRepository } from '../ports/card.repository';
import { Card } from '../core/domain/card-entity';
import { TokenCard } from '../core/domain/token-card.entity';
import { ApiExternalService } from '../api-external.service';

export class CardRepositoryAdapter implements CardRepository {
  constructor(private readonly apiExternalService: ApiExternalService) {}

  async getTokenCard(card: Card): Promise<TokenCard> {
    const response = await this.apiExternalService.getTokenCard(card);
    return response as TokenCard;
  }
}
