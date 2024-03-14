import { City } from "src/city/entities/city.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('schools')
export class School {
    @PrimaryGeneratedColumn()
    private id_school: number;

    @Column("varchar", { length: 100})
    private name: string;
    
    @Column("varchar", { length: 100 })
    private address: string;
    
    @ManyToOne(() => City, city => city.school)
    @JoinColumn({ name: 'id_city' })
    city: City;

    constructor( name: string, address: string) {
        this.name = name,
        this.address = address
    }

    getIdSchool(): number { return this.id_school };

    getName(): string { return this.name };
    setNmae( name : string ): void { this.name = name }

    getAddress(): string { return this.address };
    setAddress( address: string ): void { this.address = address };
    
}