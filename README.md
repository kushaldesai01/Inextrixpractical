# Inextrix Practical

To install dependencies: npm install
To run project: npm start

How to access APIs?: First, complete the signup process, then obtain the token by using the same credentials from login API. After that, use the token to access the library routes.

auth routes
- POST http://localhost:5000/api/auth/login
- POST http://localhost:5000/api/auth/signup

library routes
- POST http://localhost:5000/api/library/books
- GET http://localhost:5000/api/library/books
- GET http://localhost:5000/api/library/books/:id
- PUT http://localhost:5000/api/library/books/:id
- DELETE http://localhost:5000/api/library/books/:id