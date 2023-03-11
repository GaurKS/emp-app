import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { EmployeeEntity } from "src/employee/entity/employee.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskEntity,
      EmployeeEntity
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
