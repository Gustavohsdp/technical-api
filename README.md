# Mypharma technical test

API in Node.js + TypeScript that applies SOLID concepts and has unit test.

## 🚀 Techs & Tools

→ [**Prisma**](https://www.prisma.io/)

→ [**TypeScript**](https://www.typescriptlang.org)

→ [**JWT**](https://jwt.io/)

→ [**Fastify**](https://www.fastify.io/)

→ [**Vitest**](https://vitest.dev/)

→ [**MongoDB**](https://www.mongodb.com/)

## Setup

Create an `.env` file:

```sh
$ cp .env.example .env
```

Edit this file and set the values for the requested environment variables, example:

```ts
# Node
NODE_ENV="dev"

#Auth
JWT_SECRET="your-secret"

# Database
DATABASE_URL="mongodb://USERNAME:PASSWORD@HOST/DATABASE?ssl=true&connectTimeoutMS=5000&maxPoolSize=50"
```

## Run app

```sh
$ npm install
```

```sh
$ npm run start:dev
```

## Build app

```sh
$ npm run build
```

## Run tests

Run unit tests

```sh
$ npm run test
```

Generate coverage

```sh
$ npm run test:coverage
```

## Routes and Parameters

## Customer

POST /customer

This route allows registering a new client in the application. The following attributes are required:

```json
{
  "email": "john@example.com",
  "name": "John",
  "address": "123 Main Street",
  "phone": "31999999999"
}
```

_PATCH_ `/customer/:customerId`

This route allows you to update the information of an existing customer in the application. It is necessary to inform the user ID to be updated in the URL. The following attributes are required:

```json
{
  "email": "john@example.com",
  "name": "John",
  "address": "123 Main Street",
  "phone": "31999999999"
}
```

_GET_ `/customer/email`

This route returns a customer registered in the application, which was searched for by email.

email (string): User email for the filter..

Example of use: '/customer/email'

```json
{
  "email": "john@example.com"
}
```

## Category

_POST_ `/category`

This route allows registering a new category in the application. The following attributes are required:

```json
{
  "name": "Camiseta"
}
```

_PATCH_ `/category/:categoryId`

This route allows updating the information of an existing category in the application. It is necessary to inform the category ID to be updated in the URL. The following attributes are required:

```json
{
  "name": "Camiseta"
}
```

_GET_ `/category/name`

This route returns a category registered in the application, which was searched by name.

name (string): Name of the category for the filter.

Example of use: `/category/name`

```json
{
  "name": "Camiseta"
}
```

_GET_ `/category`

This route returns all categories registered in the application.

Example of use: `/category`

## Product

_POST_ `/product`

This route allows registering a new product in the application. The following attributes are required:

```json
{
  "name": "Camiseta Preta",
  "description": "camiseta preta de algodão, com um foguete",
  "sku": "cpf",
  "unitaryValue": "60,89",
  "categoryId": "642af54667ff671e9c10e070",
  "active": true
}
```

_PATCH_ `/product/:productId`

This route allows you to update the information of an existing product in the application. It is necessary to inform the ID of the product to be updated in the URL. The following attributes are required:

```json
{
  "name": "Camiseta Preta",
  "description": "camiseta preta de algodão, com um foguete",
  "sku": "cpf",
  "unitaryValue": "60,89",
  "categoryId": "642af54667ff671e9c10e070",
  "active": true
}
```

_PATCH_ `/product/status/:productId`

This route allows you to update product information, whether it is active or inactive.

Example of use: `/product/status/642af7b54b7e9b5f71669ad5`

_GET_ `/product/sku`

This route returns a product registered in the application, which was searched by the sku.

sku (string): Sku from product to filter.

Example of use: `/product/sku`

```json
{
  "sku": "cpf"
}
```

_GET_ `/product`

This route returns all products registered in the application.

Example of use: `/product`

## Order

_POST_ `/order`

This route allows registering a new order in the application. The following attributes are required:

```json
{
  "customerId": "642af9a7108366f242d2ca8c",
  "productId": "642af7b54b7e9b5f71669ad5"
}
```

_PATCH_ `/order/:orderId`

This route allows updating the information of an existing order in the application. It is necessary to inform the ID of the order to be updated in the URL. The following attributes are required:

```json
{
  "customerId": "642af9a7108366f242d2ca8c",
  "productId": "642af7b54b7e9b5f71669ad5"
}
```

_PATCH_ `/order/cancel/:orderId`

This route allows you to cancel an existing order.

Example of use: `/order/cancel/642af7b54b7e9b5f71669ad5`

_GET_ `/order/:orderId`

This route returns an order registered in the application, it is necessary to inform the order ID to be located in the URL

Example of use: '/order/642af7b54b7e9b5f71669ad5'

_GET_ `/order/all/:customerId`

This route returns all orders registered in a customer's application, it is necessary to inform the customer ID to locate the orders

Example of use: '/order/all/642af7b54b7e9b5f71669ad5'

_GET_ `/order`

This route returns all orders registered in the application.

Example of use: `/order`

## Admin

_POST_ `/admin`

This route allows registering a new admin in the application. The following attributes are required:

```json
{
  "email": "xxxx@email.com",
  "name": "John Doe",
  "password": "xxxxxx"
}
```

_PATCH_ `/admin/:adminId`

This route allows updating the information of an existing admin in the application. It is necessary to inform the ID of the admin to be updated in the URL. The following attributes are required:

```json
{
  "email": "xxxx@email.com",
  "name": "John Doe",
  "password": "xxxxxx"
}
```

_GET_ `/admin`

This route returns an admin registered in the application, it is necessary to inform the email in the query to be located

### Authenticate

_POST_ `/sessions`

This route returns a JWT token and authenticates you in the application:

```json
{
  "email": "xxxx@email.com",
  "password": "xxxxxx"
}
```
