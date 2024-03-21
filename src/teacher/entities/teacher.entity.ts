import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('teachers')
export class Teacher {
    @PrimaryGeneratedColumn()
    private id_teacher: number;

    @Column("varchar", { length: 255 })
    private name: string;

    @Column("varchar", { length: 255})
    private lastname: string;

    constructor( name: string, lastname: string) {
        this.name = name,
        this.lastname = lastname
    }

    getIdTeacher(): number { return this.id_teacher };

    getName(): string { return this.name };
    setName( name: string ): void { this.name = name };

    getLastname(): string { return this.lastname };
    setLastname( lastname : string ): void { this.lastname = lastname };
    
}