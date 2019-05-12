import { Injectable, HttpService } from '@nestjs/common';
import { NSE } from "indian-stock-exchange";
import { AxiosResponse } from "axios";

@Injectable()
export class MarketService {

	constructor(private readonly httpService: HttpService) {}

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

		const info: IQuoteInfo = {
			companyName: quote,
			symbol: quote,
			lastPrice: '',
			change: '',
			deliveryPercentage: ''
		};

		// using 2 data sources to get info
		return Promise.all([
			//	1. screener apis for quote info
			this.getInfoFromScreener(quote, info)
			.catch(err => console.log(err)),
			//	2. NSE page scrapper npm package for delivery info
			this.getDeliveryInfo(quote, info)
					.catch(err => console.log(err))
		])
		.then(() => {
			return info;
		});
	}

	// Get quote info using screener api
	private async getInfoFromScreener(quote: string, info: IQuoteInfo): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			const subscription = this.httpService.get(`https://www.screener.in/api/company/search/?q=${quote}`)
			.subscribe(
				response => {
					if (response.data && response.data.length > 0) {
						let id = 0;
						for (let i = 0; i < response.data.length; i++) {
							if ((response.data[i].url as string).endsWith(`/${quote}/`)) {
								id = i;
								break;
							}
						}
						info.companyName = response.data[id].name;
						const companyId = response.data[id].id;
						const infoSubscription = this.httpService.get(`https://www.screener.in/api/2/company/${companyId}/prices/?days=7`)
						.subscribe(
							response => {
								if (response.data && response.data.prices && response.data.prices.length > 0) {
									const latestPrice = +response.data.prices[response.data.prices.length-1][1];
									const previousPrice = +response.data.prices[response.data.prices.length-2][1];
									info.lastPrice = latestPrice.toFixed(2);
									info.change = (latestPrice - previousPrice).toFixed(2);
									resolve();
								} else {
									reject('internal server error');
								}
							},
							err => reject(err),
							() => infoSubscription.unsubscribe()
						);
					} else {
						reject('internal server error');
					}
				},
				err => reject(err),
				() => subscription.unsubscribe()
			);
		});
	}

	// NSE page scrapper npm package for delivery info
	private async getDeliveryInfo(quote: string, info: IQuoteInfo): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			NSE.getQuoteInfo(quote)
			.then(response => {
				const res = response.data.data[0];

				if (res && res.deliveryToTradedQuantity) {
					info.deliveryPercentage = (+res.deliveryToTradedQuantity).toFixed(2);
					resolve();
				} else {
					reject('internal server error');
				}

				/*
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
				*/
			})
			.catch(error => {
				console.error(`getQuoteInfo failed for '${quote}'. status(${error.status}) message(${error.message})`);
				reject(error);
			});
		});
	}

	// alphavantage api for trading price
	private async getGlobalQuote(quote: string, info: IQuoteInfo): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			// check symbol as NSE symbol
			// TODO: add logic to handle BSE symbols as well
			const nseSubscription = this.httpService.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=NSE:${quote}&apikey=WN2JADZL6GJELRWC`)
			.subscribe(
				response => {
					if (response.data && response.data['Global Quote']) {
						console.log(response.data['Global Quote']);
						resolve();
					} else {
						reject('internal server error');
					}
				},
				err => reject(err),
				() => nseSubscription.unsubscribe()
			);
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
