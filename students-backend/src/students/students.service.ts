import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Student } from './student.entity'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'

@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  // CREATE
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create(createStudentDto)
    return this.studentRepository.save(student)
  }

  // READ
  async findAll(): Promise<Student[]> {
    return this.studentRepository.find()
  }

  // UPDATE
 async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student | null> {
  await this.studentRepository.update(id, updateStudentDto);
  return this.studentRepository.findOneBy({ id });
}

  // DELETE
  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id)
  }

}