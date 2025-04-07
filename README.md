# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура MVP проекта

Проект следует архитектурному паттерну Model-View-Presenter (MVP), разделяя приложение на три основных слоя:

Model: Слой организует чтение и запись данных, обработку бизнес-логики и взаимодействие с базой данных или внешними источниками данных. Слой предоставляет API для доступа к данным

View: Представление отображает данные, предоставленные Presenter, и передает пользовательский ввод Presenter. Слой представляет интерфейс пользователю, через который происходит взаимодействие с приложением

Presenter: Слой содержит бизнес-логику приложения и управляет взаимодействием между моделью и представлением. Presenter получает данные от модели, форматирует их и передает View для отображения. Presenter обрабатывает пользовательский ввод, передает команды Model для обновления данных

Компоненты взаимодействуют через события. Model генерирует события при изменении данных, Presenter слушает эти события, обновляет модель и передает данные View, а View обновляет пользовательский интерфейс и отправляет события Presenter в ответ на действия пользователя.

## Слой Model

### TAbstractClass model

класс, который используется для хранения данных в веб-приложении

Класс Model принимает два параметра в конструкторе: data и events: data содержит частичные данные для инициализации модели, events содержит экземпляр EventEmitter для работы с событиями

constructor(data: Partial, protected events: IEvents)

Метод: emitChanges(event: string, payload?: object) используется для сообщения всем, что модель была изменена. event представляет имя события, которое должно быть сообщено объетку с данными payload

### class appData

класс AppState наследует Model и отображает на странице состояние сущностей. Хранит все данные приложения и сообщает об изменениях.

свойства:

basket: string[] спсиок товаров в корзине
products: IProductItem[] массив, который должен содержать список товаров.
order: IOrder Объект, представляющий данные заказа, который содержит следующие свойства:
phone: string строка, для хранения номера телефона покупателя.
email: string строка, для хранения электронной почты покупателя.
address: string, строка для хранения адресса
payment: paymentType Значение PaymentType.Online, указывающее на тип оплаты.
items: string[] общий список товаров
total: number Сумма заказа

Методы:

get basket(): string[] - геттер для свойства _basket
set basket(value: string[]) - сеттер для свойства _basket
get products(): IProductItem[] - геттер для свойства _products
set products(value: IProductItem[]) - сеттер для свойства _products
get order(): IOrder - геттер для свойства _order
set order(value: IOrder) - сеттер для свойства _order
setCatalog(products: IProductItem[]) - устанавливает значение для свойства _products и вызывает метод emitChanges
getBasketItems(): IProductItem[] - возвращает отфильтрованный список продуктов, которые есть в корзине
getSum(): number - возвращает общую сумму цен продуктов в корзине
getSumOfItems(): number - возвращает количество элементов в корзине

## View

### TAbstractClass component

класс для создания компонентов пользовательского интерфейса, которые могут быть легко настроены

constructor(container: HTMLElement) - Принимает HTML-элемент, в который будет помещен компонент

Методы:

toggleClass(element: HTMLElement, className: string, force?: - boolean) - Переключает класс className у element
setText(element: HTMLElement, text: any) - Устанавливает текстовое содержимое элемента element равным value
setDisabled(element: HTMLElement, disabled: boolean) - Устанавливает атрибут disabled у element
setHidden(element: HTMLElement) - Скрывает элемент
setVisible(element: HTMLElement) - Отображает элемент
setImage(element: HTMLImageElement, src: string, alt?: string) - Устанавливает атрибуты src и alt для element
render(data?: Partial)``: HTMLElement - Обновляет свойства компонента с помощью данных из data и возвращает корневой элемент компонента

### Class page

Наследует класс Component, отображает страницу, определяет структуру данных

constructor(container: HTMLElement, protected events: IEvents) - инициализирует элементы страницы: счетчик, каталог, обертку и корзину. IEvents Настраивает обработчик события для клика по корзине

Свойства:

counter: HTMLElement - счетчик товаров в корзине
catalog: HTMLElement - элемент, предоставляющий каталог
wrapper: HTMLElement - элемент, оборачивающий страницу
basket: HTMLElement - элемент, предоставляющий корзину

Методы:

setCounter(count: number) - Устанавливает значение счетчика товаров
setCatalog(cards: HTMLElement[]) - Отображает карточки товаров
setLocked(locked: boolean) - Блокирует прокрутку страницы

### Class card

Наследует класс Component<ICard>. отображает контент товара: заголовок, изображение, описание, кнопку, категорию и цену

constructor(container: HTMLElement, protected data: T, protected events: IEvents)

Свойства (HTMLElements):

_title : HTMLButtonElement - заголовок карточки
_image : HTMLButtonElement - изображение карточки
_description : HTMLButtonElement - описание карточки.
_button : HTMLButtonElement - кнопка действия карточки.
_category : HTMLButtonElement - категория карточки.
_price : HTMLButtonElement - цена товара.

Методы:

get title(): HTMLElement; get image(): HTMLImageElement; 
get description(): HTMLElement; get button(): HTMLButtonElement; 
get category(): HTMLButtonElement; get price(): HTMLButtonElement;

set title(title: HTMLElement); set image(image: HTMLImageElement); 
set description(description: HTMLElement); 
set button(button: HTMLButtonElement); 
set category(category: HTMLButtonElement); 
set price(price: HTMLButtonElement); 
set id(value: string)

addButoonAction(actions?: ICardActions): void - добавляет событие кнопке

### Class basket

Наследует абстрактный класс Component. класс Basket управляет визуалом корзины: списком товаров, общаей суммой и возможностю открытия заказа. Класс обрабатывает клик по кнопке и вызывает события через EventEmitter

constructor(container: HTMLElement, events: EventEmitter) - создает HTML-элемент, в который будет встроен компонент корзины

Свойства (HTMLElements):

protected _list: HTMLElement - элементы корзины 
protected _total: HTMLElement - элемент суммы заказов 
protected _button: HTMLElement - элемент кнопки

Методы:

set items(items: HTMLElement[]) - сеттер для свойства _list
set total(total: number) - устанавливает текстовое содержимое узла _total в формате "<число> синапсов"
setButtonDisabled(state: boolean) - устанавливает свойство disabled узла _button в зависимости от значения state. Если state равно true, то кнопка становится неактивной, иначе - активной.

### Класс Modal

Наследуется от абстрактного класса Component<IModal>.
Содержит информацию отображения модального окна

constructor(container: HTMLElement, events: IEvents) - Создает карточку товара для корзины

Свойства

closeButton: HTMLButtonElement - Кнопка закрытия окна
content: HTMLElement - Контейнер для содержимого окна
Методы
set content(content: HTMLElement | null) - Устанавливает содержимое окна
open() - Открывает модальное окно
close() - Закрывает модальное окно
render(data: IModalData): HTMLElement - Отрисовывает окно с содержимым

### Class form

Наследует абстрактный класс Component. Описывает базовой формы отправки данных

constructor(container: HTMLFormElement, events: IEvents)

Свойства (HTMLElements):

submit - Кнопка отправки формы
errors - контейнер для отображения ошибок валидации

Методы:

onInputChange(name: string, value: string) - отменяет стандарное поведение отправки формы
setValid(valid: boolean) - Устанавливает доступность кнопки отправки
setErrors(errors: string) - устанавливает текст ошибок в контейнере ошибок
render(data: { valid?: boolean, errors?: string, [key: string]: any }) - обновляет состояние формы и присваивает новые значения полям формы

### Класс Address

- Наследует от класса Form<IAddressForm>. Форма оплаты и доставки

constructor(container: HTMLFormElement, events: IEvents)

Методы

set payment(name : string) - Устанавливает класс button_alt-active для выбранной кнопки оплаты
set address(value: string) - Устанавливает значение поля адреса.

### Класс Contacts

Наследует класс Form<IContactsForm>. Форма контактной информации:

constructor(container: HTMLFormElement, events: IEvents)

Методы

set phone(value: string)` - Устанавливает значение поля телефона.
set email(value: string)` - Устанавливает значение поля email.

### Class success

Наследует класс Component. отображает сообщение об успешном выполнении действия

constructor(container: HTMLElement, total: number, actions: ISuccessActions) - принимает контейнер, в котором будет размещаться сообщение об успехе

Свойства (HTMLElements):

total - общая сумма заказа
close - при клике вызывает функцию onClick из объекта actions

## Presenter

### Class EventEmitter

Обеспечивает работу системы событий, устанавливает обработчики на определенные события и данные

constructor() { this.\_events = new Map<EventName, Set>(); } задается свойство \_events, управляет событиями в приложении

Методы:

on<T extends object>(eventName: EventName, callback: (event: T) => void) - устанавливает обработчики события
off(eventName: EventName, callback: Subscriber) - удаляет обработчики с события
emit<T extends object>(eventName: string, data?: T) - инициирует события с данными
onAll(callback: (event: EmitterEvent) => void) - Устанавливает обработчик на события
offAll() - удаляет обработчики
trigger<T extends object>(eventName: string, context?: Partial<T>) - делает функцию-триггер, которая при вызове генерирует событие с данными

### Class api

Обеспечивает взаимодействие с API.Отправляет get и post

constructor(baseUrl: string, options: RequestInit = {}) - создает новый экземпляр класса Api

Методы:

get - отправка GET-запроса к API
post - отправка POST, PUT или DELETE-запроса к API
handleResponse - обработка ответа от сервера. возвращает промис, разрешающийся в JSON-объект ответа или отклоняющийся с текстом ошибки из ответа

### Class webLarekApi

Используется для обеспечения работы с конкретными данными, которые связаны с продуктами и заказами

Методы:

getProductList(): Promise<IProductItem[]> - выполняет GET-запрос к серверу для получения списка продуктов
getProductItem(id: number): Promise - выполняет GET-запрос к серверу для получения информации о конкретном продукте
orderProducts (order: IOrder): Promise - выполняет POST-запрос к серверу для размещения заказа

## Типы данных:

**IProductItem** - свойства товара, карточка продукта.
export interface IProduct {
id: string;
description: string;
image: string;
title: string;
category: string;
price: number;
}

**IOrder** - все данные пользователя о заказе
export type IOrder = IAddressForm &
IContactsForm & {
total: number;
items: string[];
};

**IContactsForm** - форма контактов.
interface IContactsForm {
email: string;
phone: string;
}

**IAddressForm** - форма адреса и спосба оплаты.
interface IAddressForm {
payment: PaymentType;
address: string;
}

**TPaymentType** - способ оплаты
export type TPaymentType =
'онлайн' |
'при получении'

**IOrderStatus** - ответ сервера после заказ
export interface IOrderStatus {
status: string;
totalPrice: number;
}

```

```

## События:

- `cards:display` - вызывает перерисовку каталога на странице
- `cards:show` - открытие окна товара
- `modal:open` - блокировка прокрутки страницы
- `modal:close` - разблокировка прокрутки страницы
- `card:add` - добавление элемента в корзину
- `basket:open` - открытие корзины
- `card:delete` - удаление карточки из корзины
- `order:open` - открытие формы оформления заказа
- `contacts:open` - открытие элемента контакты
- `order:submit` - подтверждение полей

```

```
