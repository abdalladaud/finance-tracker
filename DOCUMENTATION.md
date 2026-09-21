# Finance Tracker — Technical Documentation

## 1. Project Overview

Finance Tracker is a full-stack personal finance management application for managing income, expenses, transactions, categories, and user profiles through a responsive web interface.

The project is organized as **one full-stack repository** containing two main applications:

- `frontend/` — React frontend application
- `backend/` — Node.js/Express REST API

The frontend communicates with the backend through REST API endpoints.

## 2. Project Structure

```text
finance-tracker/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── seeds/
│   ├── utilities/
│   ├── index.js
│   └── package.json
│
├── docs/
│   └── screenshots/
│       ├── login.png
│       ├── register.png
│       ├── dashboard.png
│       ├── transactions.png
│       ├── categories.png
│       ├── profile.png
│       ├── adminOverView.png
│       ├── adminUsers.png
│       └── adminTransactions.png
│
├── README.md
└── DOCUMENTATION.md
```

## 3. Project Goals

The main goals of Finance Tracker are to provide:

- Secure user authentication
- Personal income and expense tracking
- Transaction management
- Category management
- Monthly financial summaries
- User profile management
- Profile image uploads
- Administrative management
- Responsive light and dark interfaces
- Clear loading, empty, error, and confirmation states

## 4. Technology Stack

### Frontend

- React
- React Router
- Tailwind CSS
- shadcn/ui
- Lucide React
- TanStack React Query
- Zustand
- Axios
- Sonner

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Zod
- Multer
- Cloudinary
- Helmet
- CORS
- Express Rate Limit
- Swagger

## 5. Application Architecture

The application follows a client-server architecture.

```text
User
  │
  ▼
React Frontend
  │
  │ REST API / JWT
  ▼
Express Backend
  │
  ├── Authentication
  ├── Users
  ├── Transactions
  ├── Categories
  └── Admin
  │
  ▼
MongoDB
```

The frontend is responsible for the user interface, routing, local authentication state, API communication, server-state management, and user interactions.

The backend is responsible for authentication, authorization, validation, business logic, database operations, file uploads, security middleware, and API responses.

## 6. Frontend Structure

The frontend is organized into reusable pages, components, layouts, routes, API modules, state management, and utilities.

```text
frontend/src/
├── components/
├── layouts/
├── lib/
├── pages/
├── routes/
├── utils/
└── ...
```

### Main responsibilities

- Rendering application pages
- Managing navigation
- Protecting authenticated routes
- Managing authentication state
- Calling backend API endpoints
- Managing server state with React Query
- Managing client authentication state with Zustand
- Rendering responsive UI components
- Displaying toast notifications
- Handling loading, empty, and error states

## 7. Backend Structure

The backend provides the REST API used by the frontend.

```text
backend/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── schemas/
├── seeds/
├── utilities/
└── index.js
```

### Main responsibilities

- Authentication
- User management
- Profile management
- Transaction management
- Categories
- Admin operations
- Validation
- File uploads
- Security middleware
- Error handling
- API documentation

## 8. Routing

The frontend contains public routes and protected routes.

### Public routes

- `/login`
- `/register`

### Protected user routes

- `/dashboard`
- `/transactions`
- `/categories`
- `/profile`

### Protected admin routes

- `/admin`
- `/admin/users`
- `/admin/transactions`

Admin routes are protected by an admin-specific route guard.

The frontend role check is primarily for navigation and user experience. Backend authorization is the actual security layer for admin API endpoints.

## 9. Authentication

Finance Tracker uses JWT-based authentication.

The main authentication workflow is:

```text
Register/Login
     │
     ▼
Backend validates credentials
     │
     ▼
JWT token generated
     │
     ▼
Frontend stores authenticated user + token
     │
     ▼
Token attached to protected API requests
```

### Authentication features

- User registration
- User login
- Current-user retrieval
- JWT authentication
- Protected routes
- Email verification workflow
- Forgot/reset password workflow
- Logout
- Profile updates

The application uses the same login flow for normal users and administrators. The authenticated user's `role` determines whether admin functionality is available.

Supported roles:

- `user`
- `admin`

## 10. Authentication State

The frontend uses Zustand for authentication state.

The authentication store contains:

- `user`
- `token`
- `isAuthenticated`

The store also provides actions for:

- Login
- Logout
- Updating the current user

Authentication state is persisted so the application can restore the user's session after page refreshes.

## 11. API Client

The frontend uses Axios for communication with the backend.

The API client is responsible for:

- Configuring the API base path
- Attaching JWT authentication headers
- Sending authenticated requests
- Supporting regular JSON requests
- Supporting multipart requests for profile image uploads

The API layer is separated into feature-specific modules such as authentication and admin API modules.

## 12. Dashboard

The dashboard provides an overview of the user's finances.

Main dashboard areas include:

- Total income
- Total expenses
- Current balance
- Monthly summary
- Recent transactions
- Add transaction functionality

The dashboard uses reusable components such as summary cards, monthly summary sections, recent transaction sections, and transaction dialogs.

## 13. Transactions

Users can manage financial transactions through the transaction interface.

Transaction data includes fields such as:

- Title
- Amount
- Type
- Category
- Date

Transaction types include:

- `income`
- `expense`

The transaction interface supports creating and managing financial records while providing loading, empty, error, and success feedback states.

## 14. Categories

The application provides predefined transaction categories and category-based organization for financial activity.

Categories are used by transactions to describe the purpose of income or expenses.

## 15. Profile

The profile page allows the authenticated user to manage profile information.

Supported profile functionality includes:

- Updating name
- Updating email
- Uploading a profile image

Profile images are handled through the backend and Cloudinary.

The frontend updates the authenticated user state after a successful profile update so the updated information is reflected throughout the application.

## 16. Main Layout

Authenticated pages share a common application layout.

The main layout contains:

- Sidebar
- Header
- Main content area
- Footer

The sidebar provides navigation to the main user pages and, for administrators, additional admin navigation.

The footer is part of the normal page flow so it does not overlap long content such as large tables.

## 17. Sidebar

Normal users have navigation for:

- Dashboard
- Transactions
- Categories
- Profile

Administrators additionally have an `ADMIN` section containing:

- Overview
- Users
- Transactions

Admin navigation is displayed based on the authenticated user's role.

## 18. Admin Architecture

The admin system is built on the same authentication system as normal users.

The frontend uses the authenticated user's role to control access to admin pages.

The backend protects admin endpoints using authentication and admin authorization middleware.

This provides two layers:

```text
Frontend role check
       +
Backend authorization
```

The backend authorization is the security boundary.

## 19. Admin Overview

The admin overview provides platform-level statistics.

The backend overview endpoint calculates information including:

- Total users
- Total income
- Total expenses
- Top spending categories

The frontend presents these values using reusable admin statistic cards and overview components.

## 20. Admin Users

Administrators can manage users through the admin users page.

Available actions include:

- View user details
- Copy user ID
- Edit user
- Change user role
- Delete user

### User details

The user details dialog displays information such as:

- Profile image
- Name
- Email
- Role
- User ID

### Edit user

The edit dialog allows administrators to update supported user information, including:

- Name
- Email
- Role

The backend validates updates and protects against duplicate email addresses.

### Delete user

Deleting a user requires confirmation through a destructive confirmation dialog.

## 21. Admin Transactions

The admin transaction page is designed around users rather than displaying every transaction as a separate top-level row.

Transactions returned by the backend are grouped in the frontend by user.

The top-level table displays:

- User
- Transaction count
- Income
- Expenses
- Net

Clicking a user expands that row and displays the user's individual transactions.

Individual transaction details include:

- Transaction title/category
- Type
- Amount
- Date

This approach keeps the main admin transaction table compact while still providing access to detailed transaction activity.

## 22. Admin API

The frontend admin API module communicates with endpoints for:

- Admin overview
- All users
- Individual user
- Updating a user
- Deleting a user
- Admin transactions

The frontend uses React Query to fetch and mutate admin data.

After successful user mutations, relevant queries are invalidated so the interface receives fresh data.

## 23. Authentication API

The authentication layer provides functionality for:

- Registration
- Login
- Current authenticated user
- Profile update

Profile updates support multipart form data because profile images can be uploaded.

The API client must allow FormData requests to use their correct content type and boundary information.

## 24. React Query and Server State

TanStack React Query is used for server-state management.

It handles:

- Data fetching
- Loading states
- Error states
- Mutations
- Query invalidation
- Refetching

Examples of query keys include:

- `adminUsers`
- `adminTransactions`

After mutations such as editing or deleting a user, the relevant query is invalidated to keep the UI synchronized with the backend.

## 25. Error Handling

The application provides explicit UI states for:

- Loading
- Empty data
- API errors
- Validation errors
- Mutation errors

Toast notifications are used for important success and error feedback.

Forms can display field-level validation messages returned by the backend.

Destructive operations such as user deletion require confirmation.

## 26. UI / UX Design System

The interface follows a clean and minimal visual system.

Key principles include:

- Consistent spacing
- Clear typography hierarchy
- Theme-aware colors
- Visible borders
- Rounded cards and containers
- Reusable shadcn/ui components
- Lucide icons
- Minimal hover effects
- Clear visual hierarchy
- Responsive layouts

Primary action buttons use the application's foreground/background theme rather than hard-coded colors.

Destructive actions use the destructive theme color.

## 27. Light and Dark Theme

The application supports light and dark themes.

Components use theme-aware Tailwind classes so colors adapt automatically to the active theme.

The UI avoids unnecessary hard-coded colors where theme-aware alternatives are available.

## 28. Responsive Design

The application is designed for:

- Desktop
- Tablet
- Mobile

Responsive behavior is applied to:

- Sidebar navigation
- Headers
- Dashboard cards
- Tables
- Forms
- Dialogs
- Page containers

Wide tables use horizontal scrolling where necessary instead of forcing the content into an unusable narrow layout.

## 29. Screenshots and Documentation Assets

Project screenshots are stored in:

```text
docs/screenshots/
```

Current screenshots include:

```text
login.png
register.png
dashboard.png
transactions.png
categories.png
profile.png
adminOverView.png
adminUsers.png
adminTransactions.png
```

These images are referenced from the root `README.md`.

## 30. Security Model

Security is implemented across both frontend and backend.

### Authentication

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes

### Authorization

- User/admin roles
- Backend admin authorization

### Validation

- Zod validation
- Backend request validation
- User update validation

### API security

- Helmet
- CORS configuration
- Rate limiting
- Global error handling
- 404 handling

### File uploads

Profile images are processed through the backend and Cloudinary.

Sensitive credentials and environment variables must not be committed to the repository.

## 31. Data Flow — User Login

```text
Login Form
   │
   ▼
loginUser()
   │
   ▼
POST /auth/login
   │
   ▼
Backend validates credentials
   │
   ▼
JWT + user returned
   │
   ▼
Zustand auth store
   │
   ▼
Navigate to Dashboard
```

## 32. Data Flow — Create Transaction

```text
Transaction Form
   │
   ▼
Frontend API request
   │
   ▼
Backend transaction route
   │
   ▼
Authentication middleware
   │
   ▼
Validation
   │
   ▼
Transaction controller
   │
   ▼
MongoDB
   │
   ▼
API response
   │
   ▼
React Query updates/refetches data
```

## 33. Data Flow — Profile Update

```text
Profile Form
   │
   ▼
FormData
   │
   ▼
PATCH /auth/profile
   │
   ▼
Authentication middleware
   │
   ▼
File upload processing
   │
   ▼
Cloudinary
   │
   ▼
User update
   │
   ▼
Updated user returned
   │
   ▼
Zustand user state updated
```

## 34. Data Flow — Admin User Update

```text
Admin Users Page
   │
   ▼
Edit User Dialog
   │
   ▼
updateAdminUser()
   │
   ▼
PUT /admin/users/:userId
   │
   ▼
Authentication
   │
   ▼
Admin authorization
   │
   ▼
Validation + update
   │
   ▼
MongoDB
   │
   ▼
Updated user response
   │
   ▼
React Query invalidates adminUsers
   │
   ▼
Users table refreshes
```

## 35. Development Workflow

A typical local development workflow is:

### Start the backend

```bash
cd backend
npm install
npm run dev
```

### Start the frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Both applications run locally while communicating through the configured API base URL.

## 36. Environment Variables

Environment variables should be configured separately according to the frontend and backend requirements.

Backend configuration can include:

- MongoDB connection information
- JWT secret
- Cloudinary credentials
- CORS configuration
- Server configuration

Frontend configuration includes:

- Backend API base URL

Never commit real secrets to GitHub.

Use `.env` files locally and make sure they are included in `.gitignore`.

## 37. API Documentation

The backend provides Swagger documentation.

Production Swagger documentation:

https://finance-tracker-api-pdy4.onrender.com/docs

The backend production API is:

https://finance-tracker-api-pdy4.onrender.com

## 38. Maintenance Guide

When extending the application:

### Adding a frontend page

1. Create the page component.
2. Add its route.
3. Add navigation if necessary.
4. Reuse existing UI components.
5. Add loading, empty, and error states where applicable.
6. Connect the page to the appropriate API module.

### Adding an API feature

1. Create or update the backend route.
2. Add validation.
3. Add controller logic.
4. Update the model if necessary.
5. Add authentication/authorization where required.
6. Create or update the frontend API module.
7. Connect the API to the appropriate React Query query or mutation.
8. Invalidate affected queries after mutations.

### Adding an admin feature

1. Add the backend admin endpoint.
2. Protect it with authentication and admin authorization.
3. Add the frontend API function.
4. Add the admin page/component.
5. Add the admin route.
6. Add the admin sidebar navigation.
7. Add query invalidation after mutations where needed.

## 39. Completed Feature Checklist

### Authentication

- [x] Registration
- [x] Login
- [x] JWT authentication
- [x] Protected routes
- [x] Email verification workflow
- [x] Forgot/reset password workflow
- [x] Logout

### User Features

- [x] Dashboard
- [x] Transactions
- [x] Categories
- [x] Profile
- [x] Profile image upload
- [x] Monthly summary
- [x] Recent transactions

### Admin Features

- [x] Admin overview
- [x] User management
- [x] View user details
- [x] Edit user
- [x] Change user role
- [x] Delete user
- [x] Admin transaction overview
- [x] Transactions grouped by user
- [x] Expandable transaction details

### UI / UX

- [x] Responsive design
- [x] Light mode
- [x] Dark mode
- [x] Loading states
- [x] Empty states
- [x] Error states
- [x] Toast feedback
- [x] Confirmation dialogs
- [x] Custom 404 page

## 40. Project Status

Finance Tracker is a completed full-stack project containing both frontend and backend applications in a single repository.

The project combines:

- A React frontend
- A Node.js/Express backend
- MongoDB data storage
- JWT authentication
- User and admin functionality
- Transaction and category management
- Profile management
- Cloudinary image uploads
- Responsive UI
- Light and dark themes
- API documentation

## 41. Documentation Files

The repository uses two main documentation files:

### README.md

The main project introduction and quick-start guide.

It covers:

- Project overview
- Features
- Screenshots
- Technology stack
- Project structure
- Installation
- Basic configuration

### DOCUMENTATION.md

The detailed technical documentation.

It covers:

- Architecture
- Frontend
- Backend
- Authentication
- Admin system
- API integration
- State management
- Security
- Data flows
- Development and maintenance

## 42. Final Architecture Summary

```text
                         Finance Tracker
                               │
              ┌────────────────┴────────────────┐
              │                                 │
          frontend/                         backend/
              │                                 │
          React App                       Express API
              │                                 │
      React Router                      Controllers
      React Query                       Middlewares
      Zustand                           Models
      Axios                              Routes
      Tailwind                           Schemas
      shadcn/ui                          Utilities
              │                                 │
              └──────────── REST API ───────────┘
                              │
                              ▼
                           MongoDB
                              │
                              ▼
                          Cloudinary
                       (profile images)
```

The repository is intentionally organized as one full-stack project while keeping frontend and backend code separated into their own folders.

## 43. Author

**Abdalla Daud Elmi**
