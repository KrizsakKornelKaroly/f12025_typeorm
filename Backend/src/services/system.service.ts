import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

export class SystemService {

    constructor() {}

    async getHealth(){
        return "Still alive 👍";
    }

    //TODO: dashboard data
}