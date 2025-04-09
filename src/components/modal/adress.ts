import { Form } from './../common/form';
import { IAddressForm, PaymentType } from '../../types';
import { IEvents } from '../base/events';
import { ensureAllElements, ensureElement } from '../../utils/utils';

export class AddressForm extends Form<IAddressForm> {
	protected _alts: HTMLButtonElement[];
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;
	protected _next: HTMLButtonElement;
	protected _address: HTMLInputElement;

	private isChoosen = false;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._alts = ensureAllElements<HTMLButtonElement>('.button_alt', container);
		this._next = this.container.querySelector('button.order__button');
		this._card = ensureElement<HTMLButtonElement>(
			'button[name=card]',
			container
		);
		this._cash = ensureElement<HTMLButtonElement>(
			'button[name=cash]',
			container
		);
		this._address = this.container.querySelector('input[name="address"]');

		this._alts.forEach((tab) => {
			tab.addEventListener('click', () => {
				this.isChoosen = true;
				if (this.checkAddres()) {
					this._next.removeAttribute('disabled');
				} else {
					this._next.setAttribute('disabled', '');
				}
				if (this._card === tab) {
                    this.toggleClass(this._card, 'button_alt-active', true);
                    this.toggleClass(this._cash, 'button_alt-active', false);
                } else {
                    this.toggleClass(this._cash, 'button_alt-active', true);
                    this.toggleClass(this._card, 'button_alt-active', false); 
                }
			});
		});

		this._address.addEventListener('input', () => {
			if (this.checkAddres()) {
				this._next.removeAttribute('disabled');
			} else {
				this._next.setAttribute('disabled', '');
			}
		});

		this._next.addEventListener('click', () => {
            const order: IAddressForm = {
                address: this._address.value,
                payment: this.isButtonActive(this._card)
                    ? PaymentType.Online
                    : PaymentType.OnDelivery,
            };
            events.emit('contacts:open', order);
        });
    }

    checkAddres() {
        return this._address.value !== '' && this.isChoosen;
    }
	
    private isButtonActive(button: HTMLButtonElement): boolean {
        return button.classList.contains('button_alt-active');
    }
}