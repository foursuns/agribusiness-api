# agribusiness-api
Agribusiness API Rest

## Installation

```bash
npm install
```

## Enviroment

```bash
ren env-example .env
```

## Docker

```bash
docker-compose -f "docker-composer.yml" up -d --build
```

## Prisma

```bash
npx prisma generate
```

```bash
npx prisma migrate dev --name init
```

```bash
npm run seed
```

## Data Exploration

```bash
npx prisma studio
```

## Tests

```bash
npm run test
```

```bash
npm run test:cov
```

## Running the app

```bash
# development
$ npm run start

# development with watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger

(<http://localhost:5000/agribusiness/api/v1/swagger>)
