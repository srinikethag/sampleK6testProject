import dotenv from 'dotenv';
import { readFileSync, writeFileSync } from 'fs';
dotenv.config();

process.env.NEW_VALUE=10

fs.writeFileSync('.env', `NEW_VALUE=${process.env.NEW_VALUE}`);
