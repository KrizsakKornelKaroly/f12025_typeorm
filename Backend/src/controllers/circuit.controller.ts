import { Request, Response } from "express";
import { CircuitService } from "../services/circuit.service";

export class CircuitController{

    constructor(
        private circuitService = new CircuitService()
    ) {}

        list = async (req: Request, res: Response) => {
            try {
                const circuits = await this.circuitService.getAllCircuits();
                res.status(200).json(circuits);
            } catch (error) {
                res.status(500).json({ error: "Failed to retrieve circuits" });
            }
        }

        getById = async (req: Request, res: Response) => {
            const {id} = req.params;
            try {
                const circuit = await this.circuitService.getCircuitById(Number(id));
                if (circuit) {
                    res.status(200).json(circuit);
                } else {
                    res.status(404).json({ error: "Circuit not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "Failed to retrieve circuit" });
            }
        }

        create = async (req: Request, res: Response) => {
            const { name, country, city, lengthKm, lapRecord } = req.body;
            if (!name || !country || !city || !lengthKm || !lapRecord) {
                return res.status(400).json({ error: "All fields are required" });
            }
            try {
                const circuit = await this.circuitService.createCircuit({ name, country, city, lengthKm, lapRecord });
                res.status(201).json(circuit);
            } catch (error) {
                res.status(500).json({ error: "Failed to create circuit" });
            }
        }

        update = async (req: Request, res: Response) => {
            const {id} = req.params;
            const { name, country, city, lengthKm, lapRecord } = req.body;
            if (!name || !country || !city || !lengthKm || !lapRecord) {
                return res.status(400).json({ error: "All fields are required" });
            }
            try {
                const circuit = await this.circuitService.updateCircuit(Number(id), { name, country, city, lengthKm, lapRecord });
                if (circuit.affected == 0) {
                    return res.status(404).json({ error: "Circuit not found" });
                }
                res.status(200).json({message: "Circuit updated successfully"});
            } catch (error) {
                res.status(500).json({ error: "Failed to update circuit" });
            }
        }

        delete = async (req: Request, res: Response) => {
            const { id } = req.params;
            try {
                const result = await this.circuitService.deleteCircuit(Number(id));
                if (result.affected == 0) {
                    return res.status(404).json({ error: "Circuit not found" });
                }
                res.status(200).json({ message: "Circuit deleted successfully" });
            } catch (error) {
                res.status(500).json({ error: "Failed to delete circuit" });
            }
        }

}