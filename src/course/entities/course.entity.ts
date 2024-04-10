import { School } from "src/school/entities/school.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    private id_course: number;

    @Column({ length:30 })
    private name: string;

    @ManyToOne(() => Teacher, teacher => teacher.id_course)
    @JoinColumn()
    id_teacher: Teacher[];

    @ManyToOne(() => School, school => school.id_course)
    @JoinColumn()
    id_school: School;


    constructor(name: string) {
        this.name = name;
    }

    getIdClass(): number { return this.id_course };

    getName(): string { return this.name };
    setName( name : string): void { this.name = name };
}
