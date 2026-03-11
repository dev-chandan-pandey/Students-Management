import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { StudentsService } from './students.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'

@Controller('students')
export class StudentsController {

  constructor(private readonly studentsService: StudentsService) { }

  // POST /students
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto)
  }

  // GET /students
  // @Get()
  // findAll() {
  //   return this.studentsService.findAll()
  // }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.studentsService.findAll(+page, +limit)
  }
  
  // PATCH /students/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(+id, updateStudentDto)
  }

  // DELETE /students/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id)
  }

}