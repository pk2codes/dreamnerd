import {Client, ClientConfig} from "pg";
import config from "../config";

function getClient(): Client {
    const {DB_CONNECTION} = config;
    const {host, password, port, user} = DB_CONNECTION;
    const clientConf: ClientConfig = {
        host, password, port, user
    };
    return new Client(clientConf);
}
