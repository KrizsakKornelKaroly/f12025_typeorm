import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Circuit } from "./circuit.entity";

@Entity("race")

export class Race {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    round!: number;

    @Column({length: 255})
    grandPrix!: string;

    @Column()
    date!: Date;

    @Column({length: 64})
    status!: string;

    @ManyToOne(() => Circuit)
    @JoinColumn({ name: "circuitId" })
    circuit!: Circuit;

}