import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async createTask(empID: number, task: createTaskDTO) {
    const employee = await this.employeeRepository.findOne({
      where: {
        empId: empID,
      },
    });

    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.BAD_REQUEST);
    }
    
    const newTask = await this.taskRepository.create({
      ...task,
      assignee: employee,
    });
    await this.taskRepository.save(newTask);

    return {
      statusCode: 201,
      message: 'Task created successfully',
      data: newTask
    };
  }

  async getTasks() {
    const tasks = await this.taskRepository.find();
    return {
      statusCode: 200,
      message: 'Tasks fetched successfully',
      data: tasks
    }
  }

  async getTask(id: number) {
    const task = await this.taskRepository.findOne({
      where: {
        taskId: id
      }
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
    }

    return {
      statusCode: 200,
      message: 'Task fetched successfully',
      data: task
    }
  }

  async updateTask(taskId: number, updateTask: updateTaskDTO) {
    const task = await this.taskRepository.findOne({
      where: {
        taskId: taskId
      }
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
    }

    await this.taskRepository.update(taskId, updateTask);
    return {
      statusCode: 200,
      message: 'Task updated successfully',
      data: await this.taskRepository.findOne({
        where: {
          taskId: taskId
        }
      })
    }
  }

  async deleteTask(id: number) {
    const task = await this.taskRepository.findOne({
      where: {
        taskId: id
      }
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
    }

    await this.taskRepository.delete(id);
    return {
      statusCode: 200,
      message: 'Task deleted successfully',
    }
  }
}

