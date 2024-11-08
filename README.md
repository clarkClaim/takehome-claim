# Claim Take-Home Project

A GraphQL API built with Node.js, TypeScript, Prisma, and PostgreSQL, containerized with Docker.

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
- Start Prisma Studio (database viewer)
- Start the development server

The following services will be available:
- GraphQL API: http://localhost:4123/graphql
- Prisma Studio: http://localhost:5555
- PostgreSQL: see `docker ps`, or to directly access the database, check the database URL in the `.env` file and connect with any PostgreSQL client.