export interface IAppState {
	products: IProduct[];
	basket: string[];
	order: IOrder | null;
	formErrors: FormErrors[];
}

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | string;
}

export interface IOrder {
  paymentMethod: PaymentType;
  email: string;
  phoneNumber: string;
	address: string;
	totalPayment: number;
	productsList: string[];
}

export interface IBasket {
	title: string;
	totalPrice: number;
	products: IProduct[];
}

export type PaymentType = 
  'онлайн' | 
  'при получении'

  export type FormErrors = Partial<Record<keyof IOrder, string>>;

  export interface IOrderStatus {
	status: string;
	totalPrice: number;
}