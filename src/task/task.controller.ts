// Description: Task Controller

import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common/decorators';
import { createTaskDTO, updateTaskDTO } from './dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  /**
   * Check the server status
   * @returns String
   */
  @Get('ping')
  async ping() {
    return {
      statusCode: 200,
      message: "Hey, Server is up and running..🚀",
    }
  }

  /**
   * Create a new task
   * @param newTask: createTaskDTO
   * @returns Promise<TaskEntity>
   */
  @Post(':id')
  async createTask(
    @Param('id') empID: number,
    @Body() newTask: createTaskDTO,
  ) {
    return this.taskService.createTask(empID, newTask);
  }

  /**
   * Get all Tasks
   * @returns Promise<TaskEntity[]>
   */
  @Get()
  async getTasks() {
    return this.taskService.getTasks();
  }

  /**
   * Get a single task by taskId
   * @param taskID 
   * @returns Promise<TaskEntity>
   */
  @Get(':id')
  async getTask(
    @Param('id') id: number
  ) {
    return this.taskService.getTask(id);
  }

  /**
   * Update an Task
   * @param id 
   * @param updateTask: updateTaskDTO
   * @returns Promise<TaskEntity> 
   */
  @Patch(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTask: updateTaskDTO,
  ) {
    return this.taskService.updateTask(id, updateTask);
  }

  /**
   * Delete an Task
   * @param id 
   * @returns Promise<TaskEntity> 
   */
  @Delete(':id')
  async deleteTask(
    @Param('id') id: number,
  ) { 
    return this.taskService.deleteTask(id);
  }

}

