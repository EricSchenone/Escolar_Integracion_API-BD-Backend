import { Course } from "src/course/entities/course.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('teachers')
export class Teacher {
    @PrimaryGeneratedColumn()
    private id_teacher: number;

    @Column()
    private name: string;

    @Column()
    private lastname: string;

    @OneToMany(() => Course, course => course.id_teacher)
    @JoinColumn({ name: 'courses' })
    id_course: Course[]

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