import { Form } from './../common/form';
import { IContactsForm } from '../../types';
import { IEvents } from '../base/events';

export class Contacts extends Form<IContactsForm> {
	protected _button: HTMLButtonElement;
	protected _email: HTMLButtonElement;
	protected _phone: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._button = this.container.querySelector('button');
		this._email = this.container.querySelector('input[name="email"]');
		this._phone = this.container.querySelector('input[name="phone"]');

		this._email.addEventListener('input', () => {
			if (this.checkAvailabilityContacts()) {
				this._button.removeAttribute('disabled');
			} else {
				this._button.setAttribute('disabled', '');
			}
		});

		this._phone.addEventListener('input', () => {
			if (this.checkAvailabilityContacts()) {
				this._button.removeAttribute('disabled');
			} else {
				this._button.setAttribute('disabled', '');
			}
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();

			const data: IContactsForm = {
				email: this._email.value,
				phone: this._phone.value,
			};

			this.events.emit(`order:submit`, data);
		});
	}

	set email(email: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			email;
	}

	set phone(phone: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			phone;
	}

	checkAvailabilityContacts() {
		return this._phone.value != '' && this._email.value != '';
	}

}