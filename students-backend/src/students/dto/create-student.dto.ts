import { IsEmail, IsInt, IsNotEmpty } from 'class-validator'

export class CreateStudentDto {

  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsInt()
  age: number

}