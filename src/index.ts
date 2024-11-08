import startApolloServer from './apollo';

// Start the Apollo server
startApolloServer()
    .then(() => {
        console.log('Server initialization complete');
    })
    .catch((err) => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });
