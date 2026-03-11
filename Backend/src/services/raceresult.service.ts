import { Repository } from "typeorm";
import { RaceResult } from "../entities/raceresult.entity";
import { AppDataSource } from "../data-source";

export class RaceResultService {
    private raceResultRepository: Repository<RaceResult>;

    constructor() {
        this.raceResultRepository = AppDataSource.getRepository(RaceResult);
    }

    async getAllRaceResults(){
        return this.raceResultRepository.find({ relations: ["team", "race", "driver"] });
    }

    async getRaceResultById(id: number){
        return this.raceResultRepository.findOne({ where: { id }, relations: ["team", "race", "driver"] });
    }

    async createRaceResult(data: object){
        const race = this.raceResultRepository.create(data);
        return this.raceResultRepository.save(race);
    }

    async updateRaceResult(id: number, data: object){
        return this.raceResultRepository.update(id, data);
    }

    async deleteRaceResult(id: number){
        return this.raceResultRepository.delete(id);
    }
}
