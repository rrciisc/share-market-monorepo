export class Symbol {
	constructor(
		public companyName: string,
		public symbol: string,
		public lastPrice: number,
		public change: number,
		public deliveryPercentage: number
	) {}
}
