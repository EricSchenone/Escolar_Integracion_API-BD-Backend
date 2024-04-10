import { School } from 'src/school/entities/school.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm'
import { IsString } from 'class-validator';

@Entity('cities') 
    export class City{
        @PrimaryGeneratedColumn()
        private id_city: number;

        @Column()
        @IsString()
        private name: string;

        @OneToMany(() => School, school => school.id_city)
        @JoinColumn()
        id_school: School[];
    

        constructor(name : string) {
            this.name = name;
        }

        getIdCity(): number { return this.id_city};
        
        getName() : string { return this.name };
        setName( name: string): void { this.name = name };

    }
