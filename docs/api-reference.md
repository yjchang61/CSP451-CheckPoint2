# API Reference

## Base URL
All API endpoints are prefixed with `/api`.

## Endpoints

### Health Check

- **GET** `/health`
  - Returns the status of the API.
  - **Response**: `{ "status": "ok", "time": "..." }`

### Users

User management endpoints.

#### List Users
- **GET** `/users`
- Returns a list of all registered users.
- **Response Example**:
  ```json
  {
    "success": true,
    "count": 2,
    "data": [ ... ]
  }
  ```

#### Get User
- **GET** `/users/:id`
- Returns details for a specific user.
- **Params**: `id` (integer)

#### Create User
- **POST** `/users`
- Creates a new user.
- **Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "editor" // optional
  }
  ```

#### Delete User
- **DELETE** `/users/:id`
- Removes a user from the system.
