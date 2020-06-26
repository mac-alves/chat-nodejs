import * as knexfile from '../knexfile';
import knex from 'knex';

const connection = knex(knexfile[process.env.NODE_ENV])

export default connection;