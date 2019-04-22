import { Injectable } from '@nestjs/common';
import { NSE } from "indian-stock-exchange";
import { AxiosResponse } from "axios";

@Injectable()
export class MarketService {

	async getMarketStatus(): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			NSE.getMarketStatus()
			.then((response: AxiosResponse<IMarketStatus>) => {
				resolve(response.data.status);
			})
			.catch(error => {
				console.error(`getMarketStatus failed. status(${error.status}) message(${error.message})`);
				reject(error);
			});
		});
	}

	async getQuoteInfo(quote: string): Promise<IQuoteInfo> {
		return new Promise<IQuoteInfo>((resolve, reject) => {
			NSE.getQuoteInfo(quote)
			.then(response => {
				const res = response.data.data[0];

				const closePrice = +res.closePrice.replace(/,/g, '');
				const buyPrice = +res.buyPrice1.replace(/,/g, '');
				const sellPrice = +res.sellPrice1.replace(/,/g, '');
				const lastPrice = isNaN(closePrice) ? (isNaN(sellPrice) ? buyPrice : sellPrice) : closePrice;
				const previousClose = +res.previousClose.replace(/,/g, '');
	
				const info: IQuoteInfo = {
					companyName: res.companyName,
					symbol: res.symbol,
					lastPrice: lastPrice.toFixed(2),
					change: (lastPrice - previousClose).toFixed(2),
					deliveryPercentage: (+res.deliveryToTradedQuantity).toFixed(2)
				};
	
				return resolve(info);
			})
			.catch(error => {
				console.error(`getQuoteInfo failed for '${quote}'. status(${error.status}) message(${error.message})`);
				reject(error);
			});
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
