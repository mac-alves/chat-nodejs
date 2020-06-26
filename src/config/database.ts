import path from 'path';

export const connection = {
    sqlite : {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, 'database.sqlite'),
        },
        useNullAsDefault: true,
    },
    pg: {
        client: 'pg', // pg is the database library for postgreSQL on knexjs
        connection: {
            host: '127.0.0.1', // Your local host IP
            user: 'postgres', // Your postgres user name
            password: 'your_password', // Your postgres user password
            database: 'simple_api' // Your database name
        }
    }
}