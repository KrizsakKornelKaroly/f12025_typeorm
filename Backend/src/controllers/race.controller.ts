import { Request, Response } from "express";
import { RaceService } from "../services/race.service";
import { CircuitService } from "../services/circuit.service";

export class RaceController {

    constructor(
        private raceService = new RaceService(),
        private circuitService = new CircuitService()
    ) {}

    list = async (req: Request, res: Response) => {
        try {
            const races = await this.raceService.getAllRaces();
            res.status(200).json(races);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    getById = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const race = await this.raceService.getRaceById(Number(id));
            if (!race){
                return res.status(404).json({ error: "Race not found" });
            }
            res.status(200).json(race);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve race"});
        }
    }

    create = async (req: Request, res: Response) => {
        const {round, grandPrix, date, status, circuitId} = req.body;
        if (!round || !grandPrix || !date || !status || !circuitId) {
            return res.status(400).json({ error: "All fields are required" });
        }
        try {
            const circuit = await this.circuitService.getCircuitById(Number(circuitId));
            if (!circuit) {
                return res.status(404).json({ error: "Circuit not found" });
            }
            const races = await this.raceService.getAllRaces();
            const existingRace = races.find(race => race.round === round);
            if (existingRace) {
                return res.status(400).json({ error: "Race with the same round already exists" });
            }

            const race = await this.raceService.createRace({round,grandPrix,date,status,circuit});
            res.status(201).json(race);
        } catch (error) {
            return res.status(500).json({ error: "Failed to create race" });
        }
    }

    update = async (req: Request, res: Response) => {
        const {id} = req.params;
        const {round, grandPrix, date, status, circuitId} = req.body;

        if (!round || !grandPrix || !date || !status || !circuitId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const circuit = await this.circuitService.getCircuitById(Number(circuitId));
            if (!circuit) {
                return res.status(404).json({ error: "Circuit not found" });
            }

            const existingRace = await this.raceService.getRaceById(Number(id));
            if (!existingRace) {
                return res.status(404).json({ error: "Race not found" });
            }

            const races = await this.raceService.getAllRaces();
            const existingRaceRound = races.find(race => race.round === round);
            if (existingRaceRound) {
                return res.status(400).json({ error: "Race with the same round already exists" });
            }

            const updatedRace = await this.raceService.updateRace(Number(id), {round, grandPrix, date, status, circuit});
            res.status(200).json({message: "Race updated successfully"});
        } catch (error) {
            return res.status(500).json({ error: "Failed to update race" });
        }
    }

    delete = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const result = await this.raceService.deleteRace(Number(id));
            if (result.affected == 0) {
                return res.status(404).json({ error: "Race not found" });
            }
            res.status(200).json({ message: "Race deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete race" });
        }
    }

}