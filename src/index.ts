import './scss/styles.scss';

import { API_URL, CDN_URL } from './utils/constants';
import { LarekAPI } from './components/webLarekApi';

import { AppState } from './components/appData';

import { EventEmitter } from './components/base/events';
import { Page } from './components/page';
import { BasketCard, Card } from './components/card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/modal';
import {
	IProductItem,
	PaymentType,
	IAddressForm,
	IOrderStatus,
	IContactsForm,
} from './types';

import { Basket } from './components/modal/basket';
import { AddressForm } from './components/modal/adress';
import { Contacts } from './components/modal/contacts';
import { Success } from './components/modal/success';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);
const appData = new AppState({}, events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const adressTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderAdress = new AddressForm(cloneTemplate(adressTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

api
	.getProductList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});

events.on('cards:display', () => {
	page.catalog = appData.products.map((item) => {
		const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
			onClick: () => {
				events.emit('cards:show', item);
			},
		});
		return card.render({
			category: item.category,
			image: item.image,
			price: item.price,
			title: item.title,
			description: item.description,
		});
	});
});

events.on('cards:show', (item: IProductItem) => {
	const card = new Card('card', cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			card.button = true;
			card.addButoonAction({
				onClick: () => {
					events.emit('basket:open', item);
				},
			});
			if (!appData.basket.includes(item.id)) {
				events.emit('card:add', item);
			}
		},
	});

	if (!appData.basket.includes(item.id)) {
		card.button = false;
	} else {
		card.addButoonAction({
			onClick: () => events.emit('basket:open', item),
		});
	}

	modal.render({
		content: card.render({
			id: item.id,
			category: item.category,
			description: item.description,
			image: item.image,
			price: item.price,
			title: item.title,
		}),
	});
	events.emit('modal:open', item);
});

events.on('modal:open', () => {
	page.locked = true;
});
events.on('modal:close', () => {
	page.locked = false;
});

events.on('card:add', (item: IProductItem) => {
	appData.basket.push(item.id);
	appData.order.items.push(item.id);
	page.counter = appData.getSumOfItems();
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
	basket.total = appData.getSum();
	basket.items = appData.getBasketItems().map((item, i) => {
		const cardBasket = new BasketCard(
			'card',
			cloneTemplate(cardBasketTemplate),
			{
				onClick: () => events.emit('card:delete', item),
			}
		);
		cardBasket.index = (i + 1).toString();
		return cardBasket.render({
			title: item.title,
			price: item.price,
		});
	});
	if (appData.getSumOfItems() == 0) {
		basket.setButtonDisabled(true);
	} else {
		basket.setButtonDisabled(false);
	}
});

events.on('card:delete', (item: IProductItem) => {
	appData.basket = appData.basket.filter(
		(basketItem) => basketItem !== item.id
	);
	appData.order.items = appData.order.items.filter(
		(orderItem) => orderItem !== item.id
	);
	events.emit('basket:open');
	page.counter = appData.getSumOfItems();
});

events.on('order:open', () => {
	modal.render({
		content: orderAdress.render({
			payment: PaymentType.Online,
			valid: false,
			errors: [],
		}),
	});
});

events.on('contacts:open', (data: IAddressForm) => {
	appData.order.address = data.address;
	appData.order.payment = data.payment;
	modal.render({
		content: contacts.render({
			errors: [],
			valid: false,
			email: '',
			phone: '',
		}),
	});
});

events.on('order:submit', (data: IContactsForm) => {
	appData.order.email = data.email;
	appData.order.phone = data.phone;
	appData.order.total = appData.getSum();
	api.orderProducts(appData.order).then((res: IOrderStatus) => {
		appData.basket = [];
		appData.order.items = [];
		console.log(appData);
		page.counter = 0;

		const success = new Success(cloneTemplate(successTemplate), {
			onClick: () => {
				modal.close();
				events.emit('cards:display');
			},
		});

		modal.render({
			content: success.render({
				total: appData.order.total,
			}),
		});

		appData.order.total = 0;
	});
});