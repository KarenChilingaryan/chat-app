# Chat Application with Docker

This chat application is built with a frontend in React and a backend in NestJS, connected to a PostgreSQL database. Docker Compose is used to run everything in containers for easy setup and deployment.

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Steps to Run the Application

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Create a `.env` file:**

   In the root directory of your project, create a `.env` file with the following environment variables:

   ```bash
   # General
   NODE_ENV=development

   # Database settings
   DATABASE_HOST=postgres
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=chat_db

   # Backend settings
   BACKEND_PORT=4200
   JWT_SECRET=your_jwt_secret

   # Frontend settings
   FRONTEND_PORT=3000
   REACT_APP_API_URL=http://localhost:4200
   REACT_APP_SOCKET_BASE=http://localhost:8001
   ```

3. **Run the Docker containers:**

   To build and run the frontend, backend, and PostgreSQL services, execute the following command:

   ```bash
   docker-compose up --build
   ```

   This will:
   - Build the frontend and backend Docker images.
   - Set up the PostgreSQL database.
   - Run migrations and seeds (for the first run).

4. **Access the application:**

   Once Docker has started all services, you can access the following:
   
   - **Frontend:** `http://localhost:3000`
   - **Backend (API):** `http://localhost:4200`
   - **PostgreSQL:** On port `5432` (accessible through the backend).

5. **Stop the application:**

   To stop and remove the containers, use:

   ```bash
   docker-compose down
   ```

- To reset the database, you can remove the PostgreSQL volume with:

  ```bash
  docker-compose down -v
  ```