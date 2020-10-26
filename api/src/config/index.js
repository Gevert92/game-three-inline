let dotenv = require('dotenv');

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("Couldn't find .env file");
}

const config = {
    /**
     * Configurations of service
     */
    service: {
        port: process.env.SERVICE_PORT
    },

    /**
     * Configurations of databases
     */
    db: {
        mongodb: {
            host: process.env.MONGODB_HOST || '127.0.0.1',
            port: parseInt(process.env.MONGODB_PORT, 10) || '27017',
            database: process.env.MONGODB_DATABASE,
            username: process.env.MONGODB_USERNAME,
            password: process.env.MONGODB_PASSWORD
        },
        postgresql: {
            host: process.env.POSTGRESQL_HOST || '127.0.0.1',
            port: parseInt(process.env.POSTGRESQL_PORT, 10) || '5432',
            database: process.env.POSTGRESQL_DATABASE,
            username: process.env.POSTGRESQL_USERNAME,
            password: process.env.POSTGRESQL_PASSWORD
        }
    },

    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly'
    },

    /**
     * Data domain
     */
    domain: {
        baseUrl: process.env.URL_BASE
    }
};

module.exports = config;