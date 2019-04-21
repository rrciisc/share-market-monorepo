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
}

interface IMarketStatus {
	status: string;
}
