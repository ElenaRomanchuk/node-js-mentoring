import { Client, QueryResult } from 'pg';
import config from '../config';

const createTable: string = `
DROP TABLE public.users;
CREATE TABLE public.users
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    login varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    age integer NOT NULL,
    isdeleted boolean,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)`;

const query: string = `INSERT INTO Users (id, login, password, age, isdeleted) VALUES
('7d14c869-5a0f-4503-bffb-93718e1f6d93', 'admin', 'admin007', 30, false),
('3af44b26-861b-44e1-8fd7-4f8c8480c1d7', 'adam', 'blabla1', 33, false),
('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', 'eva', 'Zeva12', 32, false),
('1b671a64-40d5-491e-99b0-da01ff1f3341', 'super8780', 'iforgotit31', 15, false),
('c106a26a-21bb-5538-8bf2-57095d1976c1', 'vanilla', 'lala20', 20, false)
RETURNING *;`;

export const initDB = async () => {
  console.log(config.connectionString);
  const client: Client = new Client(config.connectionString);
  try {
    await client.connect();
    console.log('Connected to the DB\n');
    try {
      const createTableResult = await client.query(createTable);
      console.log('Table has created\n', createTableResult);
      const insertResult = await client.query(query);
      console.log('Query insert\n', insertResult);

    } catch (err) {
      console.log('query error\n', err);
    }
  } catch (err) {
    console.error('connection error\n', err.stack)
  }
  await client.end();
};
