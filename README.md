# Xetra
### Backend written in Nodejs with express <img height="15" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" /> and mongodb <img height="15" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" />
---

xetra is a e-commerce concept, a fully CRUD-capable backend using an `express` <img height="15" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" /> server in a `nodejs` <img height="15" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" /> environment. It makes use of `MongoDB` <img height="15" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" /> Atlas as its database hosting.

---
### Rest Api
The Rest Api is deployed on heroku and can be accessed [here](https://xetra.herokuapp.com/api/v1/)  
The Available Routes in the REST Api are listed below. Detailed implementation of the routes are in the source [here](./routes)

**Product Routes:**
Route | Request| Function| Authentication |
|-|:-|:-|-:|
`/products`| GET |View all products with details | not required
`/admin/product/new`| POST | create new product | required
`/admin/product/:id`| PUT | update product | required
`/admin/product/:id`| DELETE | delete product | required
`/product/:id`| GET | get details about single product | not rewuired
`/review/:id`| PUT | Add a new review | required
`/review/:id`| GET | get details for specific review | not required
`/review/:id`| delete | delete specific review | required

**User Routes:**
Route | Request| Function| Authentication |
|-|:-|:-|-:|
`/register`| POST | New User Sign Up | not required
`/login`| POST | User Sign In | not required
`/password/forgot`| POST |Forgot Password | not required
`/password/reset/:token`| PUT | Reset Password | not required
`/logout`| GET | Logout User | required
`/me`| GET | Signed In User Details | required
`/password/update`| PUT | Update Password | required
`/me/update`| PUT | Change Signed in user details | required
`/admin/users`| GET | Get All users | admin needed
`/admin/user/:id` | GET | Get single user detail | admin needed
`/admin/user/:id` | PUT | Update single user detail | admin needed

**Order Routes:**
Route | Request| Function| Authentication |
|-|:-|:-|-:|
`/order/new`| POST | Create New Order | required
`/order/:id`| GET | Get Single Order detail | required
`/orders/me`| GET | Get All Orders of Logged in User | required
`/admin/order/`| GET | Get All Orders | admin required
`/admin/order/:id`| PUT | update single order | admin required
`/admin/order/:id`| DELETE | delete single order | admin required

**Collection Routes:**
Route | Request| Function| Authentication |
|-|:-|:-|-:|
`/collection/new`| POST | Create New Collection | admin required
`/collections` | GET | Get all collections details| not required
`/collection/:id`| GET | Get single collection details| not required
