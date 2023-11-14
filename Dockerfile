# Stage 1: Build TypeScript to JavaScript
FROM node:20-alpine as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install development dependencies
RUN npm install

# Copy the TypeScript source code to the working directory
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Package only the compiled JavaScript
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the compiled JavaScript files from the 'dist' folder from the previous stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env ./.env

# Expose the port your app listens on
EXPOSE 4001

# Start the app using PM2
CMD [ "npx", "pm2-runtime", "start", "dist/index.js" ]
