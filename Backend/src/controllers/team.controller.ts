import { Request, Response } from "express";
import { TeamService } from "../services/team.service";

export class TeamController {

    constructor(
        private teamService: TeamService = new TeamService()
    ){}

    list = async (req: Request, res: Response) => {
        try {
            const teams = await this.teamService.getAllTeams();
            return res.status(200).json(teams);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    getById = async (req: Request, res: Response) => {
        if (!req.params.id) {
            return res.status(400).json({ error: "ID parameter is required" });
        }

        try {
            const team = await this.teamService.getTeamById(Number(req.params.id));
            if (!team) {
                return res.status(404).json({ error: "Team not found" });
            }
            return res.status(200).json(team);
        } catch {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    create = async (req: Request, res: Response) => {
        const { name, base, principal, powerUnit, color} = req.body;

        if (!name || !base || !principal || !powerUnit || !color) {
            return res.status(400).json({ error: "All fields are required" });
        }
        try {
            const team = await this.teamService.createTeam({ name, base, principal, powerUnit, color });
            return res.status(201).json(team);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }

    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, base, principal, powerUnit, color } = req.body;

        if (!name || !base || !principal || !powerUnit || !color) {
            return res.status(400).json({ error: "All fields are required" });
        }
        try {
            const result = await this.teamService.updateTeam(Number(id), { name, base, principal, powerUnit, color });

            if (result.affected == 0) {
                return res.status(404).json({ error: "Team not found" });
            }

            return res.status(200).json({ message: "Team updated successfully" });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" })
        }
        
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await this.teamService.deleteTeam(Number(id));
            if (result.affected == 0) {
                return res.status(404).json({ error: "Team not found" });
            }
            return res.status(200).json({ message: "Team deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

}