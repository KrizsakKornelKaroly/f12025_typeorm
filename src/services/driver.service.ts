import { Repository } from "typeorm";
import { Driver } from "../entities/driver.entity";
import { AppDataSource } from "../data-source";

export class DriverService {

    constructor(
        private driverRepo: Repository<Driver> = AppDataSource.getRepository(Driver)
    ){}

    async getAllDrivers(){
        return this.driverRepo.find();
    }

    async getDriverById(id: number){
        return this.driverRepo.findOneBy({id});
    }

    async createDriver(data: object){
        const driver = this.driverRepo.create(data);
        return this.driverRepo.save(driver);
    }

    async updateDriver(id: number, data: object){
        return this.driverRepo.update(id, data);
    }

    async deleteDriver(id: number){
        return this.driverRepo.delete(id);
    }

}