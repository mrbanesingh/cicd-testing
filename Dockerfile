# Use the official Node.js image from the Docker Hub
FROM --platform=linux/amd64 node:alpine

ARG PORT=9000
# Create and set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE $PORT

# Command to run the application
CMD ["npm", "run", "dev"]