# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy prisma directory first
COPY prisma/ ./prisma/

# Set environment variables for Prisma

# Generate Prisma client
RUN npx prisma generate

# Copy remaining application files
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "start:dev"]