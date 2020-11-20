import config from "./config";

const {user, port, password, host, dbName} = config.DB_CONNECTION;
const clientUrl = `jdbc:postgresql://${host}:${port}/${dbName}`;
const ORM_CONFIG = {
    password,
    user,
    entities: ["./build/db/entities"],
    dbName,
    type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
    clientUrl, // defaults to 'mongodb://localhost:27017' for mongodb driver
};
export default ORM_CONFIG;