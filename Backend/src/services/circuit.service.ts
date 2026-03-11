import { Repository } from "typeorm";
import { Circuit } from "../entities/circuit.entity";
import { AppDataSource } from "../data-source";

export class CircuitService {
    private circuitRepository: Repository<Circuit>;

    constructor() {
        this.circuitRepository = AppDataSource.getRepository(Circuit);
    }

    async getAllCircuits(){
        return this.circuitRepository.find();
    }

    async getCircuitById(id: number){
        return this.circuitRepository.findOne({ where: { id } });
    }

    async createCircuit(data: object){
        const circuit = this.circuitRepository.create(data);
        return this.circuitRepository.save(circuit);
    }

    async updateCircuit(id: number, data: object){
        return this.circuitRepository.update(id, data);
    }

    async deleteCircuit(id: number){
        return this.circuitRepository.delete(id);
    }
}
