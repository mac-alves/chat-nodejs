import path from 'path';

module.exports = {

    development: {
        client: 'pg',
        connection: {
          database: process.env.DB_DATABASE,
          user:     process.env.DB_USER,
          password: process.env.DB_PASSWORD
        },
        migrations: {
            directory: path.resolve(__dirname, 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'database', 'seeds')
        },
        useNullAsDefault: true
    },

    teste: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, 'database', 'database.sqlite'),
        },
        migrations: {
            directory: path.resolve(__dirname, 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'database', 'seeds') 
        },
        useNullAsDefault: true,
    },
    
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: path.resolve(__dirname, 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'database', 'seeds') 
        },
        useNullAsDefault: true
    }
}