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

###  Model
класс, который используется для хранения данных в веб-приложении
### Class AppStateModel
класс наследует Model и представляет  состояние: информация отображения всех сущностей

##  View

### TAbstractClass Component
Базовый класс, используется для создания компонентов интерфейса. Он принимает контейнер HTMLElement, отображающий компоненты

### Class Page
Наследует класс Component, отображает страницу, определяет структуру данных

### Class Card
Наследует класс Component<ICard>. отображает контент товара

### Class Basket
Наследует абстрактный класс Component. представляет корзину страницы

### Class Form
Наследует абстрактный класс Component. Описывает базовой формы отправки данных

### Class Success
Наследует класс Component. Отображения информацию оформленного заказа

##  Presenter

### Class EventEmitter
Обеспечивает работу системы событий, устанавливает обработчики на определенные события и данные

### Class Api
Обеспечивает взаимодействие с API.Отправляет get и post

### Class LarekApi
Используется для обеспечения работы с конкретными данными, которые связаны с продуктами и заказами


## Типы данных:

**IAppStateModel** - состояние страницы
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