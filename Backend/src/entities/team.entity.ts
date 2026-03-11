import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("team")

export class Team {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 255, unique: true})
    name!: string;

    @Column({length: 255})
    base!: string;

    @Column({length: 255})
    principal!: string;

    @Column({length: 255})
    powerUnit!: string;

    @Column({length: 32})
    color!: string;

}