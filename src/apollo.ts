import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { schema } from './graphql/schema/schema';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

async function startApolloServer() {
    // Required for Express
    const app = express();
    const httpServer = http.createServer(app);

    // Create Apollo Server instance
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    // Start the server
    await server.start();

    // Apply middleware
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        bodyParser.json(),
        expressMiddleware(server)
    );

    // Start the HTTP server
    await new Promise<void>((resolve) =>
        httpServer.listen({ port: process.env.PORT }, resolve)
    );
    console.log(
        `🚀 Server ready at http://localhost:${process.env.PORT}/graphql`
    );
}

export default startApolloServer;
