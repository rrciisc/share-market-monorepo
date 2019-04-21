import { Injectable } from '@nestjs/common';
import { NSE } from "indian-stock-exchange";
import { AxiosResponse } from "axios";

@Injectable()
export class MarketService {

	async getMarketStatus(): Promise<string> {
		return NSE.getMarketStatus().then((response: AxiosResponse<IMarketStatus>) => {
			return response.data.status;
		});
	}

	async getQuoteInfo(quote: string): Promise<IQuoteInfo> {
		return NSE.getQuoteInfo(quote).then(response => {
			const res = response.data.data[0];

			const buyPrice = +res.buyPrice1.replace(/,/g, '');
			const sellPrice = +res.sellPrice1.replace(/,/g, '');
			const lastPrice = isNaN(sellPrice) ? buyPrice : sellPrice;
			const previousClose = +res.previousClose.replace(/,/g, '');

			const info: IQuoteInfo = {
				companyName: res.companyName,
				symbol: res.symbol,
				lastPrice: lastPrice.toFixed(2),
				change: (lastPrice - previousClose).toFixed(2),
				deliveryPercentage: (+res.deliveryToTradedQuantity).toFixed(2)
			};
			return info;
		});
	}
}

interface IMarketStatus {
	status: string;
}

export interface IQuoteInfo {
	companyName: string;
	symbol: string;
	lastPrice: string;
	change: string;
	deliveryPercentage: string;
}
