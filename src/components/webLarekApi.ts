import { Api, ApiListResponse } from './base/api';
import { IProductItem, IOrder, IOrderStatus } from '../types';

export interface IWebLarekApi {
	getProductList: () => Promise<IProductItem[]>;
	getProductItem: (id: string) => Promise<IProductItem>;
	orderProducts: (order: IOrder) => Promise<IOrderStatus>;
}

export class LarekAPI extends Api implements IWebLarekApi {
	readonly cdnURL: string;

	constructor(cdnURL: string, baseURL: string, options?: RequestInit) {
		super(baseURL, options);
		this.cdnURL = cdnURL;
	}

	getProductList(): Promise<IProductItem[]> {
		return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdnURL + item.image,
			}))
		);
	}

	getProductItem(id: string): Promise<IProductItem> {
		return this.get(`/lot/${id}`).then((item: IProductItem) => ({
			...item,
			image: this.cdnURL + item.image,
		}));
	}

	orderProducts(order: IOrder): Promise<IOrderStatus> {
		return this.post('/order', order).then((data: IOrderStatus) => data);
	}
}