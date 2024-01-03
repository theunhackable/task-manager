# Use an official Node.js runtime as a parent image
FROM node:alpine
# Set the working directory to /backend
WORKDIR /usr/src/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install backend dependencies
RUN npm ci

# Copy the current directory contents into the container at /backend
COPY . .

# Make port 3001 available to the world outside this container
EXPOSE 4000

# Define environment variable
ENV NODE_ENV production

# Run backend server
CMD ["npm", "start"]
