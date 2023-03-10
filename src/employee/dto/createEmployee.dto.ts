import { 
  IsNotEmpty,
  IsString,
  IsEmail, 
  IsPhoneNumber,
  IsDateString
} from "class-validator";

export class createEmployeeDTO {
  constructor(partial?: Partial<createEmployeeDTO>) {
    Object.assign(this, partial);
  }
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsDateString()
  hireDate: Date;

  @IsNotEmpty()
  @IsString()
  position: 'Admin' | 'User' | 'Other' | string;

}