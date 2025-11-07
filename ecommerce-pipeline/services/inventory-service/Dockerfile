# Use Node.js 18 image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src/ ./src

# Expose port (inventory-service runs on 3002)
EXPOSE 3002

# Start the service
CMD ["node", "src/index.js"]
