# Backend Dockerfile
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the backend API port (environment variables are used for ports)
EXPOSE ${BACKEND_PORT}

# Command to run the backend (make sure environment variables are loaded)
CMD ["npm", "run", "start:dev"]
