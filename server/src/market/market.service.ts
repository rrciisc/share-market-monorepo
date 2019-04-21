import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketService {
	getMarketStatus(): string {
		return 'closed';
	}
}
