# Base image
FROM node:20-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy package files and prisma directory
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

# Copy our project bundle files to docker
COPY . .

# Generate Prisma client files
RUN npx prisma generate

# Creates a "dist" folder with the production build
RUN npm run build

# Base image
FROM node:20-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Create app directory
WORKDIR /usr/src/app

# Copy package files and prisma directory
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install --only=production

# Copy our project bundle files to docker
COPY . .

# Copy the production build
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/prisma ./prisma

EXPOSE 5000
# Start the server
CMD [  "npm", "run", "start:migrate:prod" ]