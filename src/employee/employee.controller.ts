import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common/decorators';
import { createEmployeeDTO, updateEmployeeDTO } from './dto';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  /**
   * Check the server status
   * @returns String
   */
  @Get('ping')
  async ping(): Promise<String> {
    return "Hey, Server is up and running..🚀";
  }

  /**
   * Create a new employee
   * @param newEmployee: createEmployeeDTO
   * @returns Promise<EmployeeEntity>
   */
  @Post()
  async createEmployee(
    @Body() newEmployee: createEmployeeDTO,
  ) {
    return this.employeeService.createEmployee(newEmployee);
  }

  /**
   * Get all employees
   * @returns Promise<EmployeeEntity[]>
   */
  @Get()
  async getEmployees() {
    return this.employeeService.getEmployees();
  }

  /**
   * Get a single employee by empId
   * @param employeeID 
   * @returns Promise<EmployeeEntity>
   */
  @Get(':id')
  async getEmployee(
    @Param('id') id: number
  ) {
    return this.employeeService.getEmployee(id);
  }

  /**
   * Update an employee
   * @param id 
   * @param updateEmployee: updateEmployeeDTO
   * @returns Promise<EmployeeEntity> 
   */
  @Patch(':id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployee: updateEmployeeDTO,
  ) {
    return this.employeeService.updateEmployee(id, updateEmployee);
  }

  /**
   * Delete an employee
   * @param id 
   * @returns Promise<EmployeeEntity> 
   */
  @Delete(':id')
  async deleteEmployee(
    @Param('id') id: string,
  ) { 
    return this.employeeService.deleteEmployee(id);
  }

}
