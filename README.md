# Express.js Authentication API

## Description
This is a simple authentication API built using Express.js, MongoDB, and JWT. It supports user registration, login, and search functionalities with secure authentication mechanisms.

## Features
- User registration with secure password hashing (bcrypt)
- JWT-based authentication for secure access
- User login with token generation
- Protected routes requiring authentication
- User search functionality

## Tech Stack
- **Backend:** Express.js, Node.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token), bcrypt
- **Validation:** Express-validator

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/express-auth-api.git
   ```

2. Navigate to the project directory:
   ```sh
   cd express-auth-api
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Set up the `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### 1. Register User
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": { "id": "userId", "email": "john@example.com" }
  }
  ```

### 2. Login User
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

### 3. Get User Profile (Protected Route)
- **Endpoint:** `GET /api/auth/profile`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```
- **Response:**
  ```json
  {
    "id": "userId",
    "email": "john@example.com",
    "name": "John Doe"
  }
  ```

### 4. Search Users (Protected Route)
- **Endpoint:** `GET /api/auth/search?query=john`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```
- **Response:**
  ```json
  [
    {
      "id": "userId",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
  ```

## License
This project is open-source and available under the MIT License.

---

### Note:
Make sure to replace `your_mongodb_connection_string` and `your_secret_key` in the `.env` file before running the project.

