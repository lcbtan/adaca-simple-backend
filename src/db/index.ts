import pkg from 'pg';
import { dbConfig } from '../config/env.ts';
const { Pool } = pkg;

const pool = new Pool(dbConfig);

export default pool;