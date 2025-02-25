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

###  Model
класс, который используется для хранения данных в веб-приложении

Класс Model принимает два параметра в конструкторе: data и events: data содержит частичные данные для инициализации модели, events содержит экземпляр EventEmitter для работы с событиями

constructor(data: Partial, protected events: IEvents)

Метод: emitChanges(event: string, payload?: object) используется для сообщения всем, что модель была изменена. event представляет имя события, которое должно быть сообщено объетку с данными payload


### Class AppState
класс AppState наследует Model и отображает на странице состояние сущностей. Хранит все данные приложения и сообщает об изменениях. 

Содержит свойства:

products: общий список товаров
basket: спсиок товаров в корзине
order: Объект, представляющий данные заказа
formErrors: Объект, представляющий ошибки формы, который инициализируется пустым объектом

Методы: 

toggleOrderedProduct(id: string, isInclude: boolean): void - добавляет или удаляет продукт из корзины
isProductSelected(): void - проверяет, был ли добавлен продукт в корзину
getAddedProductItems(): ProductItems[] - Проверяет, заказан ли товар
validateOrder(): bool - Проверяет валидность формы заказа и обновляет formErrors
validateContacts(): bool - проверяет правильность заполнения формы
getBasketItemsCount(): numeric - Возвращает количество заказанных товаров
getTotal(): numeric - Вычисляет общую стоимость заказа
clearBasket(): void - очищает корзину и сбрасывает заказ

##  View

### TAbstractClass Component
класс для создания компонентов пользовательского интерфейса, которые могут быть легко настроены

constructor(container: HTMLElement) - Принимает HTML-элемент, в который будет помещен компонент

Методы:

toggleClass(element: HTMLElement, className: string, force?: - boolean) - Переключает класс className у element
setText(element: HTMLElement, text: any) - Устанавливает текстовое содержимое элемента element равным value
setDisabled(element: HTMLElement, disabled: boolean) -  Устанавливает атрибут disabled у element
setHidden(element: HTMLElement) - Скрывает элемент
setVisible(element: HTMLElement) - Отображает элемент
setImage(element: HTMLImageElement, src: string, alt?: string) - Устанавливает атрибуты src и alt для element
render(data?: Partial)``: HTMLElement - Обновляет свойства компонента с помощью данных из data и возвращает корневой элемент компонента

### Class Page
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

### Class Card
Наследует класс Component<ICard>. отображает контент товара: заголовок, изображение, описание, кнопку, категорию и цену

constructor(blockName: string, container: HTMLElement, events: ICardActions) -  cоздает карточку товара

Свойства (HTMLElements):

title - заголовок карточки
image - изображение
description - описание
button - кнопка
price - цены
category - категории

Методы:

setTitle - Устанавливает заголовок 
setImage - Устанавливает изображение 
setDescription - Устанавливает описание 
setButtonText - Устанавливает текст
getPrice - Возвращает цену
setPrice - Устанавливает цену
setCategory - Устанавливает категорию товара

### Class Basket
Наследует абстрактный класс Component. класс Basket управляет визуалом корзины: списком товаров, общаей суммой и возможностю открытия заказа. Класс обрабатывает клик по кнопке и вызывает  события через EventEmitter

constructor(container: HTMLElement, events: EventEmitter) - создает HTML-элемент, в который будет встроен компонент корзины

Свойства (HTMLElements):

list - товары в корзине
total - общая стоимость
items - карточки товаров в корзине

Методы:

toggleButton(disabled: boolean) - активирует кнопку оформления заказа
setItems(items: HTMLElement[]) - Отображает карточки товаров в корзине
setTotal(total: number) - считает общую стоимость товаров

### Class Form
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

### Class Success
Наследует класс Component. отображает сообщение об успешном выполнении действия

constructor(container: HTMLElement, total: number, actions: ISuccessActions) - принимает контейнер, в котором будет размещаться сообщение об успехе

Свойства (HTMLElements):

total - общая сумма заказа
close - при клике вызывает функцию onClick из объекта actions

##  Presenter

### Class EventEmitter
Обеспечивает работу системы событий, устанавливает обработчики на определенные события и данные

constructor() { this._events = new Map<EventName, Set>(); }  задается свойство _events, управляет событиями в приложении

Методы: 

on<T extends object>(eventName: EventName, callback: (event: T) => void) - устанавливает обработчики события
off(eventName: EventName, callback: Subscriber) - удаляет обработчики с события
emit<T extends object>(eventName: string, data?: T) - инициирует события с данными
onAll(callback: (event: EmitterEvent) => void) - Устанавливает обработчик на события
offAll() - удаляет обработчики
trigger<T extends object>(eventName: string, context?: Partial<T>) - делает функцию-триггер, которая при вызове генерирует событие с данными

### Class Api
Обеспечивает взаимодействие с API.Отправляет get и post

constructor(baseUrl: string, options: RequestInit = {}) - создает новый экземпляр класса Api

Методы:

get - отправка GET-запроса к API
post -  отправка POST, PUT или DELETE-запроса к API
handleResponse -  обработка ответа от сервера. возвращает промис, разрешающийся в JSON-объект ответа или отклоняющийся с текстом ошибки из ответа

### Class LarekApi
Используется для обеспечения работы с конкретными данными, которые связаны с продуктами и заказами

constructor(cdn: string, baseUrl: string, options?: RequestInit) - наследует Api и предназначается для взаимодействия с API магазина

Методы:

getProductList(): Promise<IProductItem[]> - выполняет GET-запрос к серверу для получения списка продуктов
getProduct(id: number): Promise - выполняет GET-запрос к серверу для получения информации о конкретном продукте
orderProducts (order: IOrder): Promise - выполняет POST-запрос к серверу для размещения заказа

## Типы данных:

**IAppState** - состояние страницы
export interface IAppState {
	products: IProduct[];
	basket: string[];
	order: IOrder | null;
	formErrors: FormErrors[];
}

**IProduct** - карточка продукта
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | string;
}

**IOrder** - форма заказа
export interface IOrder {
  paymentMethod: PaymentType;
  email: string;
  phoneNumber: string;
	address: string;
	totalPayment: number;
	productsList: string[];
}

**IBasket** - корзина с карточками
export interface IBasket {
	title: string;
	totalPrice: number;
	products: IProduct[];
}

**IOrderAddress** - форма оплаты и доставки
export interface IOrderAddress {
	paymentMethod: TPaymentType;
	address: string;
}

**TPaymentType** - способ оплаты
export type TPaymentType = 
  'онлайн' | 
  'при получении'

export type FormErrors = Partial<Record<keyof IOrder, string>>;

**IOrderResult** - ответ сервера после заказ
export interface IOrderStatus {
	id: string;
	totalPayment: number;
}
```

```
## События:

- `card:select` - открытие окна товара
- `card:addedToBasket` - закрытие после добавления
- `card:removeFromBasket` - закрытие после отмены добавления
- `basket:open` - открытие корзины
- `basket:change` - изменение корзины
- `order:submit` - подтверждение полей 
- `formErrors` - ошибка заполнения полей
- `modal:open` - блокировка страницы
- `modal:close` - разблокировка страницы
```
