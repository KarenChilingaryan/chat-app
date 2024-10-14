## Chat Application - Backend

This is the backend for the Chat Application built using **NestJS** and **PostgreSQL**, supporting real-time communication through WebSockets.

### Requirements
- **Node.js** (v14 or higher)
- **PostgreSQL**
- **Sequelize CLI**

### Steps to Setup Backend

#### 1. Clone the Repository

```bash
git clone <backend-repo-url>
cd backend-folder
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Setup Environment Variables

Create a `.env.development` file in the root directory of the backend with the following:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=chat_db
BACKEND_PORT=4200
SOCKET_PORT=8001
JWT_SECRET=your_secret_key
NODE_ENV=development
```

#### 4. Setup PostgreSQL Database

Ensure PostgreSQL is running and create a database named `chat_db`.

```bash
CREATE DATABASE chat_db;
```

#### 5. Run Migrations

After setting up the database, run the migrations to create the necessary tables.

```bash
npx sequelize-cli db:migrate --config ./sequelize.config.js
```

#### 6. Run the Backend

To start the NestJS backend, run:

```bash
npm run start:dev
```

The backend will be available on `http://localhost:4200`.

#### 7. WebSocket Server

The WebSocket server will run automatically on `http://localhost:8001`.
