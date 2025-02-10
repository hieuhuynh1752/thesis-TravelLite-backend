# Base image
FROM node:20.11.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

# Install dependencies
COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install

# Copy source files
COPY . .

# Make wait-for.sh executable
RUN chmod +x wait-for.sh

RUN npx prisma generate


RUN npm run build
# Expose port
EXPOSE 8000

# Run the app
# Run migrations, seed, and start the app after DB is ready
CMD ./wait-for.sh postgres npx prisma migrate deploy && npx prisma db seed && npm run start:dev
