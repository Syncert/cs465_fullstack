# Travlr Getaways – Full Stack Web Application

## Overview
Travlr Getaways is a full stack travel booking application built with the **MEAN stack** (MongoDB, Express.js, Angular, Node.js).  
The project consists of:

- **Customer-facing site (Express + Handlebars)**  
  Showcases trips, lodging, and meal packages in a clean interface.  

- **Admin Single Page Application (Angular)**  
  Provides secure login and full CRUD management of trips.  

The application demonstrates both **traditional server-rendered HTML** and a **modern Angular SPA**, tied together through a shared API and backed by MongoDB.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or hosted, e.g., Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Syncert/cs465-fullstack.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `.env` file:
   ```env
   JWT_SECRET=your_jwt_secret
   ```
4. Seed the database (optional if you want starter data):
   ```bash
   npm run seed
   ```
5. Run the server:
   ```bash
   npm start
   ```
      Visit: [http://localhost:3000](http://localhost:3000)
6. In a separate terminal, start the Angular admin SPA:
   ```bash
   cd admin
   npm install
   ng serve
   ```
   Visit: [http://localhost:4200](http://localhost:4200)

---

## API Reference

| Method | Endpoint            | Purpose                     | Auth Required |
|--------|---------------------|-----------------------------|---------------|
| GET    | `/api/trips`        | Retrieve all trips          | No            |
| GET    | `/api/trips/:id`    | Retrieve trip by ID         | No            |
| POST   | `/api/trips`        | Add a new trip              | Yes (JWT)     |
| PUT    | `/api/trips/:id`    | Update a trip               | Yes (JWT)     |
| DELETE | `/api/trips/:id`    | Delete a trip               | Yes (JWT)     |
| POST   | `/api/register`     | Register a new user         | No            |
| POST   | `/api/login`        | Authenticate + return token | No            |

---

## Security
- User authentication is handled with **JWT (JSON Web Tokens)**.  
- On successful login, a token is issued and required for all admin operations (create, update, delete trips).  
- Requests without a valid token return **401 Unauthorized**.

---

## Testing
- **Manual API Testing**: Postman and cURL for endpoint validation.  
- **Angular SPA Testing**: Verified CRUD operations trigger correct backend responses.  
- **Negative Testing**: Verified `401 Unauthorized` without token and `404 Not Found` for invalid trip IDs.  

---

## Architecture Reflection (Module 8 Journal)

### Architecture
- The **Express + Handlebars site** required more manual file organization and templating but less boilerplate.  
- The **Angular SPA** introduced significant boilerplate via the CLI but enforced a modular, reusable structure.  
- MongoDB was chosen for its **NoSQL flexibility**, JSON compatibility, and native integration with the MEAN stack.

### Functionality
- **JSON vs JavaScript**: JSON is a lightweight data-interchange format; JavaScript is the programming language. JSON served as the “bridge” carrying data between frontend and backend.  
- Refactoring: Migrated from hard-coded HTML to **Handlebars templates** and later to **Angular components**, reducing duplication and error risk while enabling reusable UI blocks.

### Testing
- Tested methods (`GET`, `POST`, `PUT`, `DELETE`) across endpoints using Postman.  
- Implemented secure API testing with JWT authentication.  
- Example: `GET /api/trips` returns all trips; `POST /api/trips` without a token returns `401 Unauthorized`.

### Reflection
This course gave me practical exposure to a **full-stack MEAN application**—from data modeling and API design to Angular componentization and JWT authentication.  
I’ve strengthened my ability to:
- Work across the **entire stack** with confidence.  
- Apply **security best practices** in authentication.  
- Refactor code for maintainability and scalability.  

These skills directly support my professional goal of becoming a **Software Engineer**, and make me more marketable in roles that require understanding how data flows across the full stack.

---

## Author
**Nicholas Kreuziger**  
CS 465 – Full Stack Development, Final Project Submission
