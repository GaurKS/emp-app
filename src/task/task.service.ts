// Description: This file contains the service for task module

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

    // check if employee exists
    const employee = await this.employeeRepository.findOne({
      where: {
        empId: empID,
      },
    });

    // if employee not found, throw an error
    if (!employee) {
      throw new HttpException('Invalid employee id', HttpStatus.BAD_REQUEST);
    }
    
    // create a new task for the employee as assignee
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

    // get all tasks
    const tasks = await this.taskRepository.find();
    return {
      statusCode: 200,
      message: 'Tasks fetched successfully',
      data: tasks
    }
  }

  async getTask(id: number) {

    // get a task by id
    const task = await this.taskRepository.findOne({
      where: {
        taskId: id
      }
    });

    // if task not found, throw an error
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: 200,
      message: 'Task fetched successfully',
      data: task
    }
  }

  async updateTask(taskId: number, updateTask: updateTaskDTO) {

    // get a task by id
    const task = await this.taskRepository.findOne({
      where: {
        taskId: taskId
      }
    });

    // if task not found, throw an error
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    // update the task
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

    // get a task by id
    const task = await this.taskRepository.findOne({
      where: {
        taskId: id
      }
    });
    
    // if task not found, throw an error
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    // delete the task
    await this.taskRepository.delete(id);
    return {
      statusCode: 200,
      message: 'Task deleted successfully',
    }
  }
}

