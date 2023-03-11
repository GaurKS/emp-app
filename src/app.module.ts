// This is the main module of the application that imports all the other modules and 
// exports them to be used by other modules in the application (src\app.module.ts)

import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    EmployeeModule,
    TaskModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
