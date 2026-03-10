import { Repository } from "typeorm";
import { Team } from "../entities/team.entity";
import { AppDataSource } from "../data-source";

export class TeamService {
    constructor(
        private teamRepo: Repository<Team> = AppDataSource.getRepository(Team)
    ){}

    async getAllTeams(){
        return this.teamRepo.find();
    }

    async getTeamById(id: number){
        return this.teamRepo.findOneBy({id});
    }

    async createTeam(data: object){
        const team = this.teamRepo.create(data);
        return this.teamRepo.save(team);
    }

    async updateTeam(id: number, data: object){
        return this.teamRepo.update(id, data);
    }

    async deleteTeam(id: number){
        return this.teamRepo.delete(id);
    }

}