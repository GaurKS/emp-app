import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { Repository } from 'typeorm';
import { createTaskDTO, updateTaskDTO } from './dto';
import { EmployeeEntity } from 'src/employee/entity/employee.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,

    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async createTask(empID: number, newTask: createTaskDTO) {
    const task = new TaskEntity();
    task.title = newTask.title;
    task.description = newTask.description;
    task.dueDate = newTask.dueDate;

    const employee = await this.employeeRepository.findOne({
      where: {
        id: empID,
      },
    });

    task.employee = employee;

    return await this.taskRepository.save(task);
    // return await this.taskRepository.save(newTask);
  }

  async getTasks() {
    return await this.taskRepository.find();
  }

  async getTask(id: number) {
    return await this.taskRepository.findOne({  
      where: {
        id,
      },
    });
  }

  async updateTask(id: string, updateTask: updateTaskDTO) {
    return await this.taskRepository.update(id, updateTask);
  }

  async deleteTask(id: string) {
    return await this.taskRepository.delete(id);
  }
}

