# Frontend Dockerfile
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the frontend port (using environment variables)
EXPOSE ${FRONTEND_PORT}

# Command to run the frontend (environment variables will be injected)
CMD ["npm", "start"]
