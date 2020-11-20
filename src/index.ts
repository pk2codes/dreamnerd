import { program } from "commander";
import config from "./config";
import User  from "./db/entities/User";
import {Loaded, MikroORM} from "@mikro-orm/core";
import MicroORMConf from "./mikro-orm.config";
import {EntityRepository} from "@mikro-orm/core/entity";
program.version('0.0.1');



program
    .version('0.0.1')
    .command('add')
    .description(`adds a user`)
    .action(async () => {
        console.log("Start writing");
        const {user, port, password, host, dbName} = config.DB_CONNECTION;
        const clientUrl = `jdbc:postgresql://${host}:${port}/${dbName}`;
        const orm = await MikroORM.init();
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
program.command('list')
    .description(`lists users`)
    .action(async () => {
        const {user, port, password, host, dbName} = config.DB_CONNECTION;
        const clientUrl = `jdbc:postgresql://${host}:${port}/${dbName}`;
        const orm = await MikroORM.init();
        console.log("Orm initialized");
        const userRepo: EntityRepository<User> = orm.em.getRepository(User);
        const loadedUsers: Loaded<User>[] = await userRepo.findAll();
        loadedUsers.forEach((loadedUser: Loaded<User>) => {
            console.log(JSON.stringify(loadedUser));
        });
    });


program.parse(process.argv);
