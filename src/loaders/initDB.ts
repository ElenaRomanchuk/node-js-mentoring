import { Client } from 'pg';
import config from '../config';

const createUserTableQuery: string = `
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

const fillUserTableQuery: string = `INSERT INTO Users (id, login, password, age, isdeleted) VALUES
('7d14c869-5a0f-4503-bffb-93718e1f6d93', 'admin', 'admin007', 30, false),
('3af44b26-861b-44e1-8fd7-4f8c8480c1d7', 'adam', 'blabla1', 33, false),
('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', 'eva', 'Zeva12', 32, false),
('1b671a64-40d5-491e-99b0-da01ff1f3341', 'super8780', 'iforgotit31', 15, false),
('c106a26a-21bb-5538-8bf2-57095d1976c1', 'vanilla', 'lala20', 20, false)
RETURNING *;`;

const createGroupTableQuery: string = `
DROP TABLE public.groups;
DROP TYPE permissionsType;
CREATE TYPE permissionsType AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');
CREATE TABLE public.groups
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name varchar(255) NOT NULL,
    permissions permissionsType[] NOT NULL,
    CONSTRAINT groups_pkey PRIMARY KEY (id)
)`;

const fillGroupTableQuery: string = `INSERT INTO groups (id, name, permissions) VALUES
('1234c869-5a0f-4503-bffb-93718e1f6d93', 'admin', ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']::permissionsType[]),
('56784b26-861b-44e1-8fd7-4f8c8480c1d7', 'manager', ARRAY['READ', 'SHARE']::permissionsType[]),
('9432bd7f-11c0-43da-975e-2a8ad9ebae0b', 'guest', ARRAY['READ']::permissionsType[]),
('aaaa1a64-40d5-491e-99b0-da01ff1f3341', 'developer', ARRAY['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES']::permissionsType[])
RETURNING *;`;

const createUserGroupTableQuery: string = `
DROP TABLE public.user_group;
CREATE TABLE public.user_group
(
    "UserId" uuid NOT NULL,
    "GroupId" uuid NOT NULL,
    CONSTRAINT user_group_pkey PRIMARY KEY ("UserId", "GroupId")
)`;

const addUserGroupConstraintsQuery: string = `
-- ALTER TABLE public.user_group DROP CONSTRAINT "user_group_UserId_fkey";

ALTER TABLE public.user_group
    ADD CONSTRAINT "user_group_UserId_fkey" FOREIGN KEY ("UserId")
    REFERENCES public.users (id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE;

-- ALTER TABLE public.user_group DROP CONSTRAINT "user_group_GroupId_fkey";

ALTER TABLE public.user_group
    ADD CONSTRAINT "user_group_GroupId_fkey" FOREIGN KEY ("GroupId")
    REFERENCES public.groups (id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE CASCADE;
`;


const initTable = async (client: Client, createTableQuery: string, fillTableQuery?: string) => {
  try {
    const createTableResult = await client.query(createTableQuery);
    console.log('Table has created\n', createTableResult);
    if (fillTableQuery) {
      const insertResult = await client.query(fillTableQuery);
      console.log('Query insert/alter\n', insertResult);
    }
  } catch (err) {
    console.log('query error\n', err);
  }
};

export const initDB = async () => {
  console.log(config.connectionString);
  const client: Client = new Client(config.connectionString);
  try {
    await client.connect();
    console.log('Connected to the DB\n');
    await initTable(client, createUserTableQuery, fillUserTableQuery);
    await initTable(client, createGroupTableQuery, fillGroupTableQuery);
    await initTable(client, createUserGroupTableQuery, addUserGroupConstraintsQuery);
  } catch (err) {
    console.error('connection error\n', err.stack)
  }
  await client.end();
};
