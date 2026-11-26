# Café Noir — Reservation & Ordering Management System (Backend API)

RESTful backend API built with **NestJS**, **TypeORM**, and **MySQL** for Café Noir's table reservations, digital ordering, and payment processing.

## Tech Stack
- **Framework**: NestJS (TypeScript)
- **Database**: MySQL / MariaDB (via XAMPP)
- **ORM**: TypeORM
- **Authentication**: JWT (`@nestjs/jwt`, `passport-jwt`) & `bcrypt` password hashing
- **Validation**: `class-validator` & `class-transformer`

## Setup & Installation
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and configure your MySQL credentials.
3. Start MySQL in XAMPP and create an empty database named `cafe_noir`.
4. Run the development server (TypeORM automatically synchronizes all 7 tables):
   ```bash
   npm run start:dev
   ```

## API Base URL
`http://localhost:3000/api/v1`

### Key Endpoints
- **Auth**: `POST /auth/register`, `POST /auth/login`, `GET /auth/profile`
- **Customers**: `GET /customers`, `GET /customers/:id`, `PATCH /customers/:id`, `DELETE /customers/:id`
- **Menu Items**: `GET /menu-items`, `GET /menu-items/:id`, `POST /menu-items`, `PATCH /menu-items/:id`, `DELETE /menu-items/:id`
- **Café Tables**: `GET /cafe-tables`, `GET /cafe-tables/:id`, `POST /cafe-tables`, `PATCH /cafe-tables/:id`, `DELETE /cafe-tables/:id`
- **Reservations**: `GET /reservations`, `GET /reservations/:id`, `POST /reservations`, `PATCH /reservations/:id`, `DELETE /reservations/:id`
- **Orders**: `GET /orders`, `GET /orders/:id`, `POST /orders`, `PATCH /orders/:id`, `DELETE /orders/:id`
- **Order Items**: `GET /order-items`, `GET /order-items/:id`, `POST /order-items`, `PATCH /order-items/:id`, `DELETE /order-items/:id`
- **Payments**: `GET /payments`, `GET /payments/:id`, `POST /payments`, `PATCH /payments/:id`, `DELETE /payments/:id`
