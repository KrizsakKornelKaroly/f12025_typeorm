import { Request, Response } from "express";
import { DriverService } from "../services/driver.service";
import { TeamService } from "../services/team.service";

export class DriverController {

    constructor(
        private driverService = new DriverService(),
        private teamService = new TeamService()
    ) {}

    list = async (req: Request, res: Response) => {
        try {
            const drivers = await this.driverService.getAllDrivers();
            res.status(200).json(drivers);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve drivers" });
        }
    }

    getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const driver = await this.driverService.getDriverById(Number(id));
            if (!driver) {
                return res.status(404).json({ error: "Driver not found" });
            }
            res.status(200).json(driver);
        } catch (error) {
            return res.status(500).json({ error: "Failed to retrieve driver" });
        }

    }

    create = async (req: Request, res: Response) => {
        const {firstName, lastName, nationality, number, rookie, teamId} = req.body;
        if (!firstName || !lastName || !nationality || !number || rookie == undefined || !teamId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const team = await this.teamService.getTeamById(Number(teamId));
            if (!team) {
                return res.status(404).json({ error: "Team not found" });
            }

            const driver = await this.driverService.createDriver({ firstName, lastName, nationality, number, rookie, teamId });
            res.status(201).json(driver);
        } catch (error) {
            return res.status(500).json({ error: "Failed to create driver" });
        }


    }

    update = async (req: Request, res: Response) => {}

    delete = async (req: Request, res: Response) => {}

}