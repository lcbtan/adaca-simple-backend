# Node.js Server Backend

This is a simple Node.js server backend for a technical assessment test.

## Getting Started

Follow these steps to set up and run the project:

### Prerequisites

- Node.js
- Docker

### Installation

1. Install the dependencies:
  ```bash
  npm install
  ```

2. Run Docker Compose to start the services:
  ```bash
  docker-compose up
  ```

3. Ensure the database is running and you can connect to it.

4. Initialize the database:
  ```bash
  npm run init-db
  ```

5. Start the development server:
  ```bash
  npm run dev
  ```

## API Endpoints

### POST /user

Create a new user.

- **Body Parameters:**
  - `name` (string): The name of the user.
  - `age` (number): The age of the user.

### GET /user

Retrieve all users from the database.

- **Response:**
  - An array of user objects.
