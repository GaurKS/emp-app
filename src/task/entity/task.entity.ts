import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EmployeeEntity } from '../../employee/entity/employee.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  taskId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @ManyToOne(() => EmployeeEntity, (assignee: EmployeeEntity) => assignee.tasks, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  assignee: EmployeeEntity;
}