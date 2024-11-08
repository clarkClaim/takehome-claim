# Claim Take-Home Project

A GraphQL API built with Node.js, TypeScript, Prisma, and a Dockerized PostgreSQL database, designed to emulate a simplified version of the Claim schema.

## Definitions
- **Brand**: A partner company that offers cashback rewards to **Users**
- **User**: A user of the app
- **Campaign**: A general cashback reward offer that a **Brand** is willing to make to **Users**
- **Claim**: A specific instance of a **Campaign** that a **User** has received, with a value, expiration date, etc.  Can be redeemed for a **Payout**, if the User makes a qualifying **Financial Transaction** at the Brand
- **Financial Transaction**: A record of a user's financial activity, such as a credit card transaction, made at a partner **Brand**
- **Payout**: A payment made to a **User** for redeeming a **Claim**

## Project Structure notes
- `src/`: Source code
- `src/graphql/`: GraphQL endpoints and related files, including resolvers for each object type.
- `src/services/`: Business logic, such as payout processing, identifying redemable `claim`s have a matching `financial_transaction`, defining "active" or "expired" `claim`s, etc.
- `prisma/schema.prisma`: Prisma database schema definitions - this is where the database schema is defined and edited.
- `prisma/seeds/`: Seed data for the database

## Quick Start

### Prerequisites
- Node.js
- Docker
- npm

### Installation

1. Install dependencies: 
```bash
npm install
```

### Starting the project
```bash
npm run quickstart
```

This command will:
- Start PostgreSQL in Docker
- Reset the database
- Run migrations
- Seed the database
- Start and open Prisma Studio (database viewer/editor)
- Start the development server

The following services will be available:
- GraphQL API: http://localhost:4123/graphql
- Prisma Studio: http://localhost:5555
- PostgreSQL: see `docker ps`, or to directly access the database, check the database URL in the `.env` file and connect with any PostgreSQL client.

## Development

### Testing

Note that running tests will reset the database - it is recommended to add any data you would like to persist across tests to the `prisma/seeds` directory, or via `prisma.create` calls in the test file.

To execute tests:

```bash
npm run test
```
Currently implements an end-to-end demonstration of redemption + payout processing.  Any file created with the `.test.ts` suffix within the src directory will be run by Jest.

### Code Quality
```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

### Database Management
To update the database schema:
1. Modify `schema.prisma`
2. Run migrations:
```bash
npx prisma migrate dev
```

You will have to enter a name for the migration.  It may also be worth reviewing the generated migration file to ensure it is correct - you can find these in `prisma/migrations`.

To reset the database, you can run:
```bash
npm run prisma:reset
```

or reset via the quickstart script.

### Available Scripts
For a complete list of available commands, refer to `package.json`. Key scripts include:

```bash
npm run build          # Generate Prisma client and compile TypeScript
npm run dev           # Start development server with hot reload
npm run codegen       # Generate GraphQL types
npm run docker:up     # Start Docker containers
npm run quickstart    # Complete setup and start development environment
```

### Helpful Prisma Commands
```bash
npx prisma generate   # Update TypeScript types (can be run before migrating schema)
npx prisma studio     # Launch database viewer
npx prisma migrate    # Create and apply migrations
npx prisma db seed    # Seed database with initial data
```