# Server

## 🛠 Libraries and tools used

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Cors](https://github.com/expressjs/cors)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Nodemon](https://github.com/remy/nodemon)

## Getting Started

Clone this repository and install dependencies

```
> git clone https://github.com/MihailValkov/user-list-demo.git
> cd server
> npm install
```

### Create '.env' file in the main directory and populate the following information:

- `DB_NAME` -- Mongo Database name;
- `DB_CONNECTION` -- Mongo Database connection string;

### Example

```
DB_NAME=user-list
DB_CONNECTION=mongodb://localhost:27017
```

To start the server, you must run the following command in your terminal:

```
> npm run dev
```

## Base URL

The Base URL for the API is: `https://localhost:3005/api`

The documentation below assumes you are pre-pending the Base URL to the endpoints in order to make requests.

# Endpoints: Users

- `/users` -- create new user / get all users;
- `/users/:userId` -- get / update / delete user by provided id;

## Create a new user

Create a new user by sending a `POST` request to `/users` with properties `firstName`, `lastName`, `email`, `imageUrl`, `phoneNumber` and `address`. The service will respond with an object, containing newly created user.

### Body

```
{
  firstName : string;
  lastName : string;
  email : string;
  imageUrl : string;
  phoneNumber : string;
  address : {
    country : string,
    city : string;
    street : string;
    streetNumber : number;
  }
}
```

### Success Response:

Code: 201 Created

Content:

```
{
  user: {
    firstName : string;
    lastName : string;
    email : string;
    imageUrl : string;
    phoneNumber : string;
    createdAt : string;
    updatedAt :string;
  }
}
```

## Get all users

Send a `GET` request to `/users`. The service will respond with an object containing properties `users` (an array of user objects) and `count` (number of all records). This endpoint can accept query params like: `page`, `limit`, `sort`, `order`, `search` and `criteria`.

Send a `GET` request to `/users?page=1&limit=5&search=Chris&criteria=firstName&sort=createdAt&order=desc`. The service will respond with an object, containing properties `users` (an array with a maximum of 5 records, sorted in descending order by createdAt - date of creation and filtered by firstName, which includes the searched string `"Chris"`) and `count` (number of all records that match this criterion).

## Logout

Send an authorized `POST` request with empty object to `/auth/logout`. The service will respond with an object `{ message: 'Logout is successful' }`, clear a user session, and an HTTP-only cookie.

### Body

```
{}
```

## Authenticate

Send an authorized `GET` request to `/auth/authenticate`. The service will respond with an user object.

## Upload user image

Update current user image by sending an authorized `POST` request to `/auth/update-user-image` with property `image` (**File**). The service will respond with an object `{ _id: string, url: string }`

### Body

```
{
  image: File
}
```

## Update personal information

Update current user personal information by sending an authorized `POST` request to `/auth/update-user-info` with properties `firstName`, `lastName` and `phoneNumber`. The service will respond with an object containing newly updated properties.

### Body

```
{
  firstName: string,
  lastName: string,
  phoneNumber: string
}
```

## Update user address

Update current user address by sending an authorized `POST` request to `/auth/update-user-address` with properties `country`, `city`, `street` and `streetNumber`. The service will respond with an object containing newly updated properties.

### Body

```
{
  country: string,
  city: string,
  street: string,
  streetNumber: number
}
```

## Update user password

Update current user password by sending an authorized `POST` request to `/auth/update-user-password` with properties `oldPassword`, `password`, and `repeatPassword`. The service will respond with an object `{ message: 'Password has been changed successfully!' }`.

### Body

```
{
  oldPassword: string,
  password: string,
  repeatPassword: string,
}
```

# Endpoints: Products

- `/products` -- get all products;
- `/products/:productId` -- get/update product by provided id;

## Get all products

Send a `GET` request to `/products`. The service will respond with an object containing properties `products` (an array) and `count` (number of all records). This endpoint can accept queries `page` and `limit` for lazy loading the data from the service.

Send a `GET` request to `/products?page=1&&limit=10`. The service will respond with an object, containing properties `products` (an array with maximum 10 records) and `count` (number of all records).

## Get product by id

Send a `GET` request to `/products/{productId}`. The service will respond with an product object.

## Rate product

Send an authorized `PATCH` request to `/products/{productId}` with properties `rate` and `comment`. The service will respond with an object, containing newly calculated rating.

### Body

```
{
  rate: number,
  comment: string,
}
```

# Endpoints: Orders

- `/orders` -- add new order or get all orders for the currently logged in user;
- `/orders/:orderId` -- get specific order for the currently logged in user by provided order ID;
- `/orders/:orderId/:productId` -- get an ordered product for a specific order using the provided order ID and product ID for the currently logged in user.

## Get all orders

Send an authorized `GET` request to `/orders`. The service will respond with an object containing properties `ordersList` (an array) and `count` (number of all records). This endpoint can accept queries `page`, `limit`, `sort` and `order`.

Send an authorized `GET` request to `/orders?page=1&limit=5&sort=createdAt&order=desc`. The service will respond with an object, containing properties `ordersList` (an array with a maximum of 5 records, sorted in descending order by createdAt - creation date) and `count` (number of all records).

## Create a new order

Send a `POST` request to `/orders` with properties `user` (an object with user information), `products` (an array of desired products), `totalProducts`, `price`, `deliveryPrice`, `totalPrice` and `paymentMethod`. The service will respond with an object containing an order ID for a newly created order.

### Body

```
{
  user: {
    city: string,
    country: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    street: string,
    streetNumber: number
  },
  price: number,
  deliveryPrice: number,
  totalPrice: number,
  totalProducts: number,
  paymentMethod: string,
  products: [{
    productId: string,
    quantity: number,
    price: number
    totalPrice: number
    weight: number,
    selectedDough: { dough: string, _id: string },
    selectedExtras: [ {extra: string, _id: string"},... ],
    selectedSize: { size: string, _id: string },
  },...]
}
```

## Get an order

Send an authorized `GET` request to `/orders/{orderId}`. The service will respond with an order object.

## Get a product

Send an authorized `GET` request to `/orders/{orderId}/{productId}`. The service will respond with an object, containing information about the desired product.

# Endpoints: Admin

**Only for users with role `Admin`**

- `/admin/products` -- create a new product;
- `/admin/users` -- get all users;
- `/admin/users/:userId` -- get specific user by provided ID / update user account settings;
- `/admin/orders` -- get all orders;
- `/admin/orders/:orderId` -- get specific order by provided ID / update order settings;
- `/admin/products` -- get all products;

## Create a new product

Send an authorized `POST` request to `/admin/products` with properties `name`, `description`, `sizes` (an array of objects with information about every size), `doughs` (an array of objects with information about every dough), `ingredients` (an array of objects with information about every ingredient), `extras` (an array of objects with information about every extra), and `image` (**File**). The service will respond with an object containing newly created record.

### Body

```
{
  name: string,
  description: string,
  image: File,
  sizes: [{"size": string,"pieces": number,"price": number},...],
  doughs: [{"dough": string,"price": number},...],
  ingredients: [{"ingredient": string},...],
  extras: [{"extra": string,"price": number},...]
}
```

## Get all users

Send an authorized `GET` request to `/admin/users`. The service will respond with an object containing properties `users` (an array of user objects), `count` (number of all records), `roles` (an array of possible roles) and `accountStatuses` (an array of possible statuses). This endpoint can accept queries `page`, `limit`, `sort`, `order`,`searchValue` and `selectValue`.

Send an authorized `GET` request to `/admin/users?page=1&limit=5&sort=createdAt&order=desc&searchValue=mail.bg&selectValue=email`. The service will respond with an object, containing properties `users` (an array with a maximum of 5 records, sorted in descending order by createdAt - date of creation and filtered by email address, which includes the searched string `"@mail.bg"`), `count` (number of all records that match this criterion), `roles` (an array of possible roles) and `accountStatuses` (an array of possible statuses).

## Get a user by id

Send an authorized `GET` request to `/admin/users/{userId}`. The service will respond with an user object.

## Change the user account settings

Send an authorized `PATCH` request to `/admin/users/{userId}` with properties `role` and `accountStatus`. The service will respond with an object, containing newly updated properties and the email address of the current user.

### Body

```
{
  role: string,
  accountStatus: string
}
```

## Get all orders

Send an authorized `GET` request to `/admin/orders`. The service will respond with an object containing properties `orders` (an array of order objects), `count` (number of all records) and `orderStatuses` (an array of possible statuses). This endpoint can accept queries `page`, `limit`, `sort`, `order`,`searchValue` and `selectValue`.

Send an authorized `GET` request to `/admin/orders?page=1&limit=5&sort=totalProducts&order=desc&searchValue=mail&selectValue=user.email`. The service will respond with an object, containing properties `orders` (an array with a maximum of 5 records, sorted in descending order by totalProducts - count of total ordered products and filtered by email address, which includes the searched string `"mail"`), `count` (number of all records that match this criterion) and `orderStatuses` (an array of possible statuses).

## Get order by id

Send an authorized `GET` request to `/admin/orders/{orderId}`. The service will respond with an order object.

## Change order settings

Send an authorized `PATCH` request to `/admin/orders/{orderId}` with property `status`. The service will respond with an object, containing newly updated order status.

### Body

```
{
  status: string
}
```

## Get all products

Send an authorized `GET` request to `/admin/products`. The service will respond with an object containing properties `products` (an array of product objects) and `count` (number of all records). This endpoint can accept queries `page`, `limit`, `sort`, `order`,`searchValue` and `selectValue`.

Send an authorized `GET` request to `/admin/products?page=1&limit=5&sort=createdAt&order=desc&searchValue=Bacon&selectValue=name`. The service will respond with an object, containing properties `products` (an array with a maximum of 5 records, sorted in descending order by createdAt - date of creation and filtered by name, which includes the searched string `"Bacon"`) and `count` (number of all records that match this criterion)

**In case of a validation error, the service will respond with an error status code and an object containing the error message**.

```
{
  message: string
}
```
