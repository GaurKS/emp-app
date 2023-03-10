import { 
  IsNotEmpty,
  IsString,
  IsEmail, 
  IsDateString
} from "class-validator";

export class createTaskDTO {
  constructor(partial?: Partial<createTaskDTO>) {
    Object.assign(this, partial);
  }
  
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEmail()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

}
