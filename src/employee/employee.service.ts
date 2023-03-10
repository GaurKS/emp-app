import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { Repository } from 'typeorm';
import { createEmployeeDTO, updateEmployeeDTO } from './dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async createEmployee(newEmployee: createEmployeeDTO) {
    return await this.employeeRepository.save(newEmployee);
  }

  async getEmployees() {
    return await this.employeeRepository.find();
  }

  async getEmployee(id: number) {
    return await this.employeeRepository.findOne({
      where: {
        id,
      },
    });
  } 

  async updateEmployee(id: string, updateEmployee: updateEmployeeDTO) {  
    return await this.employeeRepository.update(id, updateEmployee);
  }

  async deleteEmployee(id: string) {
    return await this.employeeRepository.delete(id);
  }
}
