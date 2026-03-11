import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Race } from "./race.entity";
import { Driver } from "./driver.entity";
import { Team } from "./team.entity";

@Entity("race_result")

export class RaceResult {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    position!: number;
    
    @Column()
    points!: number;

    @Column({length: 64})
    finishTime!: string;

    @Column()
    fastestLap!: boolean;

    @Column()
    raceId!: number;

    @Column()
    driverId!: number;

    @Column()
    teamId!: number;

    @ManyToOne(() => Race, {onDelete: "CASCADE"})
    @JoinColumn({ name: "raceId" })
    race!: Race;

    @ManyToOne(() => Driver)
    @JoinColumn({ name: "driverId" })
    driver!: Driver;

    @ManyToOne(() => Team)
    @JoinColumn({ name: "teamId" })
    team!: Team;

}