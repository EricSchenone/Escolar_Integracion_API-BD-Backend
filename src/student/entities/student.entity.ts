import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn()
    private id_student: number;
    
    @Column("varchar", { length: 255 })
    private name: string;

    @Column("varchar")
    private lastname: string;

    @Column("datetime")
    private birthday: Date;

    constructor(name: string, lastname: string, birthday: Date) {
        this.name = name,
        this.lastname = lastname,
        this.birthday = birthday
    }

    getIdStudent(): number { return this.id_student};

    getName(): string { return this.name };
    setName( name : string ): void { this.name = name };

    getLastname(): string { return this.lastname };
    setLastname( lastname : string ): void { this.lastname = lastname };

    getBirthday(): Date { return this.birthday};
    setBirthday( birthday : Date ): void { this.birthday = birthday };
    
}