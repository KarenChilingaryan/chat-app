import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const database = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;

const sequelize = new Sequelize('postgres', username, password, {
    host: host,
    port: parseInt(port, 10),
    dialect: 'postgres',
});

async function createDatabase() {
    try {
        await sequelize.query(`CREATE DATABASE ${database};`);
        console.log(`Database ${database} created successfully.`);
    } catch (error: any) {
        if (error.name === 'SequelizeDatabaseError' && error.message.includes('already exists')) {
            console.log(`Database ${database} already exists.`);
        } else {
            console.error('Error creating database:', error);
        }
    } finally {
        await sequelize.close();
    }
}

createDatabase();
