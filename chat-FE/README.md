

## Chat Application - Frontend

This is the frontend for the Chat Application built using **React** with WebSockets for real-time communication.

### Requirements
- **Node.js** (v20 or higher)

### Steps to Setup Frontend

#### 1. Clone the Repository

```bash
git clone <frontend-repo-url>
cd chat-FE
```

#### 2. Install Dependencies

```bash
yarn install
```

#### 3. Setup Environment Variables

Create a `.env` file in the root directory of the frontend with the following:

```bash
REACT_APP_API_URL=http://localhost:4200
REACT_APP_SOCKET_BASE=http://localhost:8001
```

#### 4. Run the Frontend

Start the React application with:

```bash
yarn start
```

The frontend will be available on `http://localhost:3000`.
