# Claim Take-Home Project

A GraphQL API built with Node.js, TypeScript, Prisma, and a Dockerized PostgreSQL database, designed to emulate a simplified version of Claim's backend.

## Take-home Tasks
Choose one feature to implement.  

If you select the "Small Feature", you should deliver review-ready and tested code. 

If you select a "Large Feature", you should focus on delivering part or all of an MVP solution, with a short description of how you would improve your solution with more time.  If you are not able to fully complete the feature, focus on creating a clean, readable, and maintainable solution that would be easy to complete with more time, and that still correctly compiles and runs.

We will review your submission together via Zoom, discuss the tradeoffs that you made during development, then work together to add to or complete your solution.


### General Guidence
- The project is designed to be run locally with `npm run quickstart`, which will start the database, run migrations, seed the database, and start the dev server.  You do not need to modify any of the scripts in the `package.json` file.
- You can use any libraries or tools you want, including copilot.
- You should not spend more than 4 hours on this project.
- Skip unit testing for this project in favor of one or two integration tests with seed data.
- Focus on clean, readable code over performance, edge cases, or perfect coverage.
- Schema changes should be made in `schema.prisma`, and migrations should be created with `npx prisma migrate dev`.
- The database seed contains all the data you need to run the project.  If you add any additional data to the database, it should be through the seed file.

### Small Feature: Improve the Payout Service
1. Review the files within `src/services/payout`.  
2. Identify and list at least 3 places that you would refactor to make the code more readable, maintainable, or reliable, articulating why the change is needed
3. Implement the change that you think would have the most benefit.


### Large Feature: Replace "Payouts" with "Balance"
Note: This is a larger feature, and we do not expect you to complete any of the V1 requirements in the time allotted.  However, you should design the V0 solution in a way that would make it easy to implement the V1 requirements.

Right now, we create a payout immediatly when detecting a claim is redeemable (see `src/services/payout/redemption.ts`).  Due to fraud concerns, we would like to replace this with a balance that is added to with each claim that is detected.  Our primary goal is to introduce a delay before sending any money off-platform, with an eye towards programatically reviewing accounts prior to processing withdrawals.  A secondary goal is to enable users to buy `claims` with their balance.

V0 Requirements: Replace Redemption Payouts with Balance Deposits
- All users start with a balance of 0
- Users should be able to query their current balance
- Users should be able to query all deposits associated with their balance
- An Admin should be able to mark any deposit as fraudulent, which should revert the balance transaction and remove it from the user's balance.
- The existing redemption logic that creates a `payout` should be replaced with a function that updates the balance

V1 Requirements (not in scope of this take-home, but important to consider when building the V0): Withdrawals
- Users should be able to initiate a withdrawl, but it should not be processed until 2 business days after the request
- Users should not be able to process a withdrawl unless they have enough balance to cover the amount
- Users should be able to see their current balance, their "withdrawable" balance (balance - pending withdrawals), and a full history of deposits and withdrawals
- An Admin should be able to mark any withdrawal as failed, which should remove it's impact on the user's balance.
- An Admin should be able to mark a user as "suspicious", which should block all pending withdrawals for that user.
- A withdrawl, once processed, should create a `payout` object, and deduct the amount from the user's balance.


### Large Feature: Implement Authentication
1. Impliment a JWT-based authentication system using Auth0 or similar.  
2. Decode the JWT token attached to the `Authorization` header of each request to determine the user's `role` and `user_id`, which should be attached to the context of each request.
3. Secure the `user` and `payout` objects, queries, and mutations within `src/graphql/resolvers` to ensure that only authenticated users can access them.
4. Create at least one new query resolver, `current_user`, that returns the `user` object for the currently authenticated user.


### Other "Large Feature" Ideas
- Integrate with Plaid to fetch bank transactions, identify transactions that match `brands` on Claim, and create `financial_transactions` rows for qualifying transactions.
- Add the ability for `users` to trade `claims`, keeping in mind the redemption flow.  Bonus points: create a market / orderbook, rather than peer-to-peer trading
- Create a `timed_drop` that distributes three `campaign_assignments` to `users`.  The `user` gets to choose which `campaign_assignment` they accept, which should automatically create a `claim` that they own based on the `campaign` values.  Bonus points: come up with a recommendation algorithm to determine which `campaigns` it would be best for Claim to assign to each user.


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
- `src/services/`: Business logic, such as payout processing, identifying redemable `claims` with matching `financial_transactions`, defining "active" or "expired" `claims`, etc.
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