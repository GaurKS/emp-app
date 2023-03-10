import { 
  IsString,
  IsEmail, 
  IsPhoneNumber,
  IsDateString
} from "class-validator";

export class updateEmployeeDTO {
  constructor(partial?: Partial<updateEmployeeDTO>) {
    Object.assign(this, partial);
  }
  
  @IsString()
  name?: string;

  @IsEmail()
  email?: string;

  @IsPhoneNumber()
  phone?: string;

  @IsDateString()
  hireDate?: Date;

  @IsString()
  position?: 'Admin' | 'User' | 'Other' | string;

}

// export class updateEmployeeDTO extends PartialType(createEmployeeDTO) {}