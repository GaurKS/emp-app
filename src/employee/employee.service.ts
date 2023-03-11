// Description: This file contains the service for employee module

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    // check if employee already exists
    const employee = await this.employeeRepository.findOne({
      where: {
        email: newEmployee.email,
      },
    });

    // if employee already exists, throw an error
    if (employee) {
      throw new HttpException('Employee already exists', HttpStatus.BAD_REQUEST);
    }

    // create a new employee
    const emp = await this.employeeRepository.save(newEmployee);
    return {
      statusCode: 201,
      message: 'Employee created successfully',
      data: emp
    };
  }

  async getEmployees() {

    // get all employees
    const employees = await this.employeeRepository.find();
    return {
      statusCode: 200,
      message: 'Employees fetched successfully',
      data: employees
    };
  }

  async getEmployee(id: number) {

    // get an employee by id
    const employee = await this.employeeRepository.findOne({
      where: {
        empId: id,
      },
      relations: ['tasks'],
    });

    // if employee not found, throw an error
    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: 200,
      message: 'Employee fetched successfully',
      data: employee
    };
  } 

  async updateEmployee(id: number, updateEmployee: updateEmployeeDTO) {  

    // check if employee exists
    const employee = await this.employeeRepository.findOne({
      where: {
        empId: id,
      },
    });

    // if employee not found, throw an error
    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }

    // check if email already exists
    if ( updateEmployee.email && updateEmployee.email !== employee.email) {
      const emp = await this.employeeRepository.findOne({
        where: {
          email: updateEmployee.email,
        },
      });

      // if email already exists, throw an error
      if (emp) {  
        throw new HttpException('Employee already exists', HttpStatus.BAD_REQUEST);
      }
    }

    // update employee
    await this.employeeRepository.update(id, updateEmployee);
    return {
      statusCode: 200,
      message: 'Employee updated successfully',
      data: await this.employeeRepository.findOne({
        where: {
          empId: id,
        },
      })
    }
  }

  async deleteEmployee(id: number) {

    // check if employee exists
    const employee = await this.employeeRepository.findOne({
      where: {
        empId: id,
      },
    });

    // if employee not found, throw an error
    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }

    // delete employee
    await this.employeeRepository.delete(id);
    return {
      statusCode: 200,
      message: 'Employee deleted successfully',
    };
  }
}

