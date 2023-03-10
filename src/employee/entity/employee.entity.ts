import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskEntity } from '../../task/entity/task.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  hireDate: Date;

  @Column()
  position: string;

  // @OneToMany(() => Task, (task) => task.employee)
  // tasks: Task[];
}
