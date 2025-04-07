import { IProductItem, IOrder, PaymentType } from '../types';
import { Model } from './base/model';

export interface IAppState {
	catalog: IProductItem[];
	order: IOrder | null;
	basket: string[];
}

export class AppState extends Model<IAppState> {
	_basket: string[] = [];
	catalog: IProductItem[];
	_order: IOrder = {
		phone: '',
		address: '',
		email: '',
		payment: PaymentType.Online,
		items: [],
		total: 0,
	};

	get basket(): string[] {
		return this._basket;
	}

	set basket(value: string[]) {
		this._basket = value;
	}

	get products(): IProductItem[] {
		return this.catalog;
	}

	set products(value: IProductItem[]) {
		this.catalog = value;
	}

	get order(): IOrder {
		return this._order;
	}

	set order(value: IOrder) {
		this._order = value;
	}

	setCatalog(products: IProductItem[]) {
		this.products = products;
		this.emitChanges('cards:display', { catalog: this.catalog });
	}

	getBasketItems(): IProductItem[] {
		return this.catalog.filter((item) => this.basket.includes(item.id));
	}

	getSum(): number {
		const arrayOfItems = this.products.filter((item) =>
			this.basket.includes(item.id)
		);
		return arrayOfItems.reduce(
			(sum: number, item: IProductItem) => sum + item.price,
			0
		);
	}

	getSumOfItems(): number {
		return this.basket.length;
	}
}