# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /frontend
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install frontend dependencies
RUN npm ci

# Copy the current directory contents into the container at /frontend
COPY . .

RUN npm run build
# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run frontend server
CMD ["npm", "run", "start"]
