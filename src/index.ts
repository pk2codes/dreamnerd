import { program } from "commander";
import config from "./config";
import User  from "./db/entities/User";
import {MikroORM} from "@mikro-orm/core";
import {EntityRepository} from "@mikro-orm/core/entity";
program.version('0.0.1');



program
    .version('0.0.1')
    .command('init')
    .description(`initializes your database using hardcoded values: ${JSON.stringify(config.DB_CONNECTION)}`)
    .action(async () => {
        console.log("Start writing");
        const {user, port, password, host, dbName} = config.DB_CONNECTION;
        const clientUrl = `jdbc:postgresql://${host}:${port}/${dbName}`;
        const orm = await MikroORM.init({
            password,
            user,
            entities: ["./build/db/entities"],
            dbName,
            type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
            clientUrl, // defaults to 'mongodb://localhost:27017' for mongodb driver
        });
        console.log("Orm initialized");
        const userRepo: EntityRepository<User> = orm.em.getRepository(User);

        const userToCreate = new User("Patrick");
        userRepo.create(userToCreate);
        userToCreate.address = "Heinrich-Ritzel-Str. 18";
        try {
            await orm.em.persistAndFlush([userToCreate]);
        } catch(flushErr) {
            console.error("Could not flush", flushErr);
        }
        const numUsers = await userRepo.count();
        console.log("Done!", numUsers);
    });


program.parse(process.argv);
