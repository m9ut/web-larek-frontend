export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export type IOrder = IAddressForm &
	IContactsForm & {
		total: number;
		items: string[];
	};

export interface IContactsForm {
	phone: string;
	email: string;
}

export interface IAddressForm {
	address: string;
	payment: PaymentType;
}

export enum PaymentType {
	Online = 'Онлайн',
	OnDelivery = 'При получении',
}

export interface IOrderStatus {
	status: string;
	totalPrice: number;
}
