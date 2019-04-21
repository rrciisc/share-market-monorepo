import { Controller, Get, Param, Header } from '@nestjs/common';
import { MarketService, IQuoteInfo } from './market.service';

@Controller('market')
export class MarketController {
	constructor(private readonly marketService: MarketService) {}

	@Get('status')
	@Header('cache-control', 'no-store')
	async getMarketStatus(): Promise<string> {
		return this.marketService.getMarketStatus().then(status => {
			return JSON.stringify(status);
		});
	}

	@Get('symbol/:id')
	@Header('cache-control', 'no-store')
	@Header('content-type', 'application/json')
	async getSymbolInfo(@Param('id') id: string): Promise<IQuoteInfo> {
		return this.marketService.getQuoteInfo(id);
	}
}
