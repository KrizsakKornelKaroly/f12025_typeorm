import { Request, Response } from "express";

import { RaceService } from "../services/race.service";
import { RaceResultService } from "../services/raceresult.service";
import { DriverService } from "../services/driver.service";
import { TeamService } from "../services/team.service";
import { CircuitService } from "../services/circuit.service";

export class SystemController {

    constructor(
        private raceService = new RaceService(),
        private driverService = new DriverService(),
        private teamService = new TeamService(),
        private raceResultService = new RaceResultService(),
        private circuitService = new CircuitService()
    ) { 
        this.getHealth = this.getHealth.bind(this);
        this.dashboardData = this.dashboardData.bind(this);
    }

    async getHealth(req: Request, res: Response) {
        return res.status(200).json({ health: "Still alive 👍" });
    }

    async dashboardData(req: Request, res: Response) {
        const drivers = await this.driverService.getAllDrivers();
        const teams = await this.teamService.getAllTeams();
        const circuits = await this.circuitService.getAllCircuits();
        const raceResults = await this.raceResultService.getAllRaceResults();
        const races = await this.raceService.getAllRaces();

        return res.status(200).json({ data: { drivers: drivers.length, teams: teams.length, circuits: circuits.length, raceResults: raceResults.length, races: races.length } });
    }

}
