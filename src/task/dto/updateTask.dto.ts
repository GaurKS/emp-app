// Description: DTO for updating a task

import { 
  IsString,
  IsEmail, 
  IsPhoneNumber,
  IsDateString
} from "class-validator";

export class updateTaskDTO {
  constructor(partial?: Partial<updateTaskDTO>) {
    Object.assign(this, partial);
  }
  
  @IsString()
  title?: string;

  @IsEmail()
  description?: string;

  @IsDateString()
  dueDate?: Date;

}

// export class updateTaskDTO extends PartialType(createTaskDTO) {}