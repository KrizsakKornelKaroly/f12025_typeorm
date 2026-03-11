import { Request, Response } from "express";
import { RaceService } from "../services/race.service";
import { RaceResultService } from "../services/raceresult.service";
import { DriverService } from "../services/driver.service";
import { TeamService } from "../services/team.service";

export class RaceResultController {

    constructor(
        private raceService = new RaceService(),
        private driverService = new DriverService(),
        private teamService = new TeamService(),
        private raceResultService = new RaceResultService()
    ) { }

    list = async (req: Request, res: Response) => {
        try {
            const raceResults = await this.raceResultService.getAllRaceResults();
            res.status(200).json(raceResults);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve race results" });
        }
     }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const raceResult = await this.raceResultService.getRaceResultById(Number(id));
            if (!raceResult) {
                return res.status(404).json({ error: "Race result not found" });
            }
            res.status(200).json(raceResult);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve race result" });
        }
    }

    create = async (req: Request, res: Response) => { 
        const {position, points, finishTime, fastestLap, raceId, driverId, teamId} = req.body;

        if (!position || !points || !finishTime || fastestLap == undefined || !raceId || !driverId || !teamId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const race = await this.raceService.getRaceById(Number(raceId));
            if (!race) {
                return res.status(404).json({ error: "Race not found" });
            }

            const driver = await this.driverService.getDriverById(Number(driverId));
            if (!driver) {
                return res.status(404).json({ error: "Driver not found" });
            }

            const team = await this.teamService.getTeamById(Number(teamId));
            if (!team) {
                return res.status(404).json({ error: "Team not found" });
            }

            if (driver.teamId !== teamId) {
                return res.status(400).json({ error: "Team ID mismatch" });
            }

            const raceResult = await this.raceResultService.createRaceResult({position, points, finishTime, fastestLap, raceId, driverId, teamId});
            res.status(201).json(raceResult);
        } catch (error) {
            return res.status(500).json({ error: "Failed to create race result" });
        }
    }

    update = async (req: Request, res: Response) => { 
        const { id } = req.params;
         const {position, points, finishTime, fastestLap, raceId, driverId, teamId} = req.body;

         if (!position || !points || !finishTime || fastestLap == undefined || !raceId || !driverId || !teamId) {
             return res.status(400).json({ error: "All fields are required" });
         }

         try {
             const race = await this.raceService.getRaceById(Number(raceId));
             if (!race) {
                 return res.status(404).json({ error: "Race not found" });
             }

             const driver = await this.driverService.getDriverById(Number(driverId));
             if (!driver) {
                 return res.status(404).json({ error: "Driver not found" });
             }

             const team = await this.teamService.getTeamById(Number(teamId));
             if (!team) {
                 return res.status(404).json({ error: "Team not found" });
             }

             if (driver.teamId !== teamId) {
                 return res.status(400).json({ error: "Team ID mismatch" });
             }

             const raceResult = await this.raceResultService.updateRaceResult(Number(id), {position, points, finishTime, fastestLap, raceId, driverId, teamId});
             res.status(200).json(raceResult);
         } catch (error) {
             return res.status(500).json({ error: "Failed to update race result" });
         }
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const result = await this.raceResultService.deleteRaceResult(Number(id));
            if(result.affected == 0) {
                return res.status(404).json({ error: "Race result not found" });
            }
            res.status(200).json({ message: "Race result deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete race result" });
        }
    }

    //TODO: RaceResult szűrés: egy pilóta nem szerepelhet 1 futamon többször

}