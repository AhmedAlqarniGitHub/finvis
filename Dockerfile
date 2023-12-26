# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Build the app
RUN npm run build

# Install a simple server to serve your app
RUN npm install -g serve

# Serve the app on port 5000
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]
