# Use a stable Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY public ./public
COPY src ./src

# Expose port 3000
EXPOSE 3000

# Use environment variable to allow external connections (important for Codespaces)
ENV HOST=0.0.0.0
ENV PORT=3000

# Start the React development server
CMD ["npm", "start"]

