import { Repository } from "typeorm";
import { Race } from "../entities/race.entity";
import { AppDataSource } from "../data-source";

export class RaceService {
    private raceRepository: Repository<Race>;

    constructor() {
        this.raceRepository = AppDataSource.getRepository(Race);
    }

    async getAllRaces(){
        return this.raceRepository.find({ relations: ["circuit"] });
    }

    async getRaceById(id: number){
        return this.raceRepository.findOne({ where: { id }, relations: ["circuit"] });
    }

    async createRace(data: object){
        const race = this.raceRepository.create(data);
        return this.raceRepository.save(race);
    }

    async updateRace(id: number, data: object){
        return this.raceRepository.update(id, data);
    }

    async deleteRace(id: number){
        return this.raceRepository.delete(id);
    }
}
