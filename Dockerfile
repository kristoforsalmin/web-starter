FROM node:boron

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install dependencies
RUN npm install

# Make ports 3000 and 3001 available to the world outside this container
EXPOSE 3000 3001

# Set NODE_ENV environment variable to "production"
ENV NODE_ENV production

# Build resources
RUN npm run build

# Start static server and watch files for changes when the container launches
CMD ["npm", "run", "serve"]
