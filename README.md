# Simple GraphQL API using Apollo and Prisma

This example implements a SQLite DB with only one table and a GraphQL endpoint for CRUD operations. This application is purely for practice purposes, it is not ready for production and may contain bugs.

This example was developed as the backend for the foxproject vue application. 
https://github.com/erickrex/foxproject

It simply stores the answers of the questionnaire found in the project mentioned above to a SQLite DB.

## Prerequisites
The only requirement for this project is to have NodeJS installed.

The "npm install" command will install the following dependencies:
- Apollo Server
- GraphQL Nexus
- Prisma Client
- Prisma Migrate
- SQLite

## Project setup

### 1. Clone this repo

git clone

Install npm dependencies (to avoid peer dependency issues add the flag shown below):

```
cd graphql
npm install --legacy-peer-deps
```

Install npm dependencies:

```
cd prisma-examples/typescript/graphql
npm install 
```

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the Answer table that is defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

Now, seed the database with the sample data in [`prisma/seed.ts`](./prisma/seed.ts) by running the following command:

```
npx prisma db seed --preview-feature
```

### 3. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server.


## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

### Retrieve all answers

You can perform all the mutations and queries specified in schema.ts e.g. query for all the answers currently in the DB. 
query {
  allAnswers {
    id
    entryAt
    answer
  }
}