import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team.entity";

@Entity("driver")

export class Driver {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 255})
    firstName!: string;

    @Column({length: 255}) 
    lastName!: string;

    @Column({length: 255})
    nationality!: string;

    @Column()
    number!: number;

    @Column()
    rookie!: boolean;

    @ManyToOne(() => Team)
    @JoinColumn({ name: "teamId" })
    team!: Team;

}