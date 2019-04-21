import { Controller, Get } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
	constructor(private readonly marketService: MarketService) {}

	@Get('status')
	async getMarketStatus(): Promise<string> {
		return this.marketService.getMarketStatus().then(status => {
			return JSON.stringify(status);
		});
	}
}
