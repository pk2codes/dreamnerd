import {Entity, PrimaryKey, Property } from "mikro-orm";

@Entity()
export default class User {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    address? : string;

    constructor(name: string) {
        this.name = name;
    }

}
