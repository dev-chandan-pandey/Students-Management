import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'fw28_022',
      database: 'students_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    StudentsModule, // only import the module here
  ],
})
export class AppModule {}