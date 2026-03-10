import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("circuit")

export class Circuit {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 255, unique: true})
    name!: string;

    @Column({length: 255})
    country!: string;

    @Column({length: 255})
    city!: string;

    @Column()
    lengthKm!: number;

    @Column({length: 64})
    lapRecord!: string;

}