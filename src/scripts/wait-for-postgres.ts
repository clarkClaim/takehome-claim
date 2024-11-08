import { exec } from 'child_process';

const checkPostgres = () => {
    const command = 'docker compose ps -q db';

    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            exec(command, (error, containerId) => {
                if (error) {
                    clearInterval(interval);
                    reject(error);
                    return;
                }

                if (!containerId) {
                    return;
                }

                exec(
                    `docker inspect -f {{.State.Health.Status}} ${containerId}`,
                    (error, status) => {
                        if (error) {
                            clearInterval(interval);
                            reject(error);
                            return;
                        }

                        if (status.trim() === 'healthy') {
                            clearInterval(interval);
                            resolve(true);
                        }
                    }
                );
            });
        }, 1000);
    });
};

checkPostgres()
    .then(() => {
        console.log('PostgreSQL is ready!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error waiting for PostgreSQL:', error);
        process.exit(1);
    });
