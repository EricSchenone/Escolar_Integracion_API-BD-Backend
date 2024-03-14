import { School } from 'src/school/entities/school.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('cities') 
    export class City{
        @PrimaryGeneratedColumn()
        private id_city: number;

        @Column()
        private name: string;

        @OneToMany(() => School, (school) => school.city)
        school: School[];
    

        constructor(name : string) {
            this.name = name;
        }

        getIdCity(): number { return this.id_city};
        
        getName() : string { return this.name };
        setName( name: string): void { this.name = name };

    }
