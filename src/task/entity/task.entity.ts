import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EmployeeEntity } from '../../employee/entity/employee.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  // @ManyToOne(() => Employee, (employee) => employee.tasks)
  // employee: Employee;
}
