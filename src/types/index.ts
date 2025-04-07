export const PRODUCT_LIST_ENDPOINT = `/product/`;
export const SINGLE_PRODUCT_ENDPOINT = (productId: string) => `/product/${productId}`;
export const ORDER_ENDPOINT = `/order`;

export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface IBasket {
	items: IProductItem[];
	totalPrice: number;
	addItem(item: IProductItem): void;
	removeItem(itemId: IProductItem): void;
	calculateTotalPrice(): number;
}


export type IOrder = IAddressForm & IContactsForm & {
	total: number;
	items: string[];
}


export interface IAddressForm {
	address: string,
	payment: PaymentType
}

export enum PaymentType {
	Online = 'Онлайн',
	OnDelivery = 'При получении'
}

export interface IContactsForm {
	phone: string,
	email: string,
}

export interface Basket {
	items: IProductItem[];
	totalPrice: number;
	addItem(product: IProductItem): void;
	removeItem(itemId: string): void;
	calculateTotalPrice(): number;
}
  
export interface IOrderStatus { // отвечает за успешность заказа
	status: string;
	totalPrice: number;
}