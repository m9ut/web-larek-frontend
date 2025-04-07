import { Component } from './base/component';
import { bem, ensureElement } from '../utils/utils';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard<T> {
	id: string;
	image: string;
	price: number | string | null;
	title: string;
	button: boolean;
	category: string;
	description: string;
	onClick: () => void;
}

export class Card<T> extends Component<ICard<T>> {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _category: HTMLButtonElement;
	protected _price: HTMLElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = container.querySelector(`.${blockName}__image`);
		this._button = container.querySelector(`.${blockName}__button`);
		this._description = container.querySelector(`.${blockName}__text`);
		this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
		this._category = container.querySelector(`.${blockName}__category`);

		if (actions.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set price(price: number | null) {
		if (price) {
			const value =
				price >= 10000 ? new Intl.NumberFormat('ru').format(price) : price;
			this.setText(this._price, `${value} синапсов`);
		} else {
			this.setText(this._price, 'бесценно');
			this.setDisabled(this._button, true);
		}
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.className = this._category.className.split(' ')[0];
		switch (value) {
			case 'другое':
				this._category.classList.add(
					bem(this.blockName, 'category', 'other').name
				);
				break;
			case 'софт-скил':
				this._category.classList.add(
					bem(this.blockName, 'category', 'soft').name
				);
				break;
			case 'хард-скил':
				this._category.classList.add(
					bem(this.blockName, 'category', 'hard').name
				);
				break;
			case 'дополнительное':
				this._category.classList.add(
					bem(this.blockName, 'category', 'additional').name
				);
				break;
			case 'кнопка':
				this._category.classList.add(
					bem(this.blockName, 'category', 'button').name
				);
				break;
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set button(isAddOpiration: boolean) {
		if (isAddOpiration) {
			this.setText(this._button, 'В корзину');
		} else {
			this.setText(this._button, 'Купить');
		}
	}

	addButoonAction(actions?: ICardActions): void {
		this._button.addEventListener('click', actions.onClick);
	}
}

export interface IBasketCard {
	index: number;
}
export class BasketCard extends Card<IBasketCard> {
	protected _icon: HTMLElement;
	protected _index: HTMLElement;

	constructor(
		blockname: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(blockname, container, actions);
		this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
		this._icon = ensureElement<HTMLElement>(`.basket__item-delete`, container);
	}

	set index(index: string) {
		this.setText(this._index, index);
	}
}