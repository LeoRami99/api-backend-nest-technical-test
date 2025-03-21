import { Card } from '../core/domain/card-entity';
import { TokenCard } from '../core/domain/token-card.entity';

export interface CardRepository {
  getTokenCard(card: Card): Promise<TokenCard>;
}
