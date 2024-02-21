import { UsersRefactor1708439553223 } from "src/migrations/1708439553223-UsersRefactor";
import { DataSource } from "typeorm";
export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'qwQW12!@',
    database: 'postgres',
    entities: [],
    migrations: [UsersRefactor1708439553223],
});
