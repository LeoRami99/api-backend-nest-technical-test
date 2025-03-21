import { TokenCard } from '../core/domain/token-card.entity';

export interface ApiCardResult extends TokenCard {
  requestTimestamp?: Date;
}
