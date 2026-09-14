# Finance Tracker API

A backend REST API for managing personal finances, including authentication, transactions, categories, profile management, file uploads, and admin features.

## Features

- User registration and login
- JWT authentication
- Password hashing with bcryptjs
- Email verification
- Forgot and reset password
- User profile management
- Profile image upload with Cloudinary
- Transaction CRUD
- Monthly transaction summary
- Predefined transaction categories
- Admin user management
- Admin transaction management
- Admin dashboard overview
- Role-based authorization
- Zod request validation
- Rate limiting
- Helmet security
- CORS
- Request logging
- Global error handling
- 404 Not Found handling
- Swagger API documentation

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Zod
- Multer
- Cloudinary
- Nodemailer
- Swagger UI

## API Documentation

Swagger documentation is available at:

```text
/api-docs
```

## Main API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get the currently authenticated user |
| PATCH | `/api/auth/profile` | Update the current user's profile |

### Transactions

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/transactions` | Create a transaction |
| GET | `/api/transactions` | Get the user's transactions |
| GET | `/api/transactions/monthly-summary` | Get monthly income and expense summary |
| GET | `/api/transactions/:id` | Get a single transaction |
| PUT | `/api/transactions/:id` | Update a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |

### Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | Get predefined categories |

### File Upload

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/upload/profile` | Upload a profile image |

### Admin

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/users/:id` | Get a single user |
| PUT | `/api/admin/users/:id` | Update a user |
| DELETE | `/api/admin/users/:id` | Delete a user |
| GET | `/api/admin/transactions` | Get all transactions |
| GET | `/api/admin/overview` | Get admin dashboard overview |

## Authentication

Protected endpoints require a valid JWT Bearer token.

Example:

```text
Authorization: Bearer <your_token>
```

User roles include:

- `user`
- `admin`

Admin-only endpoints require the `admin` role.

## Running Locally

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Navigate into the project:

```bash
cd finance-tracker-api
```

Install dependencies:

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The API runs locally on:

```text
http://localhost:3000
```

## Environment Variables

Create a `.env` file in the project root and add the required environment variables used by the application.

The `.env` file contains sensitive configuration and must not be committed to GitHub.

## Project Structure

```text
finance-tracker-api/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── schemas/
├── seeds/
├── utilities/
├── index.js
├── package.json
└── README.md
```

## Security

The API includes:

- JWT authentication
- Password hashing
- Role-based authorization
- Zod validation
- Helmet security headers
- CORS
- Rate limiting
- Global error handling
- Protected routes
- Admin-only authorization

## Database

The application uses MongoDB with Mongoose.

Main models include:

- Users
- Transactions
- Categories

## File Upload

Profile images are uploaded using Multer and stored through Cloudinary.

```text
POST /api/upload/profile
```

The profile update endpoint also supports a `profileImage` upload:

```text
PATCH /api/auth/profile
```

## Admin Overview

The admin overview provides:

- Total users
- Total income
- Total expenses
- Top spending categories

Endpoint:

```text
GET /api/admin/overview
```

## Deployment

The API is prepared for deployment as a Node.js web service.

Production environment variables should be configured through the deployment platform and sensitive secrets should not be committed to GitHub.

## Project Status

The Finance Tracker API includes:

- Authentication
- User profiles
- Email verification
- Password recovery
- Transactions
- Monthly summaries
- Categories
- Profile image uploads
- Admin management
- Security middleware
- Swagger documentation

## Author

**Abdalla Daud Elmi**
