import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from './schemas/person.schema';

@Controller('persons')
export class PersonsController {
  constructor(
    private readonly personsService: PersonsService,
    @InjectModel(Person.name) private personModel: Model<Person>,
  ) {}

  @Get()
  create(@Body() createPersonDto: any) {
    if (
      createPersonDto.firstName &&
      typeof createPersonDto.firstName === 'string'
    ) {
      if (
        createPersonDto.lastName &&
        typeof createPersonDto.lastName === 'string'
      ) {
        const person = new this.personModel();
        person.firstName = createPersonDto.firstName;
        person.lastName = createPersonDto.lastName;
        person.email = createPersonDto.email;
        person.createdAt = new Date();
        person.updatedAt = new Date();
        person.save();
        return { message: 'ok' };
      } else {
        return { message: 'error' };
      }
    } else {
      return { message: 'error' };
    }
  }

  @Get('all')
  findAll() {
    return this.personModel.find();
  }

  @Get('all/:id')
  async findOne(@Param('id') id: string) {
    console.log(id);
    const person = await this.personModel.find({ _id: id });
    console.log(person);
    if (person[0]) {
      return person[0];
    } else if (!person[0]) {
      return {
        message: 'not found',
      };
    }
  }

  @Post('createMany')
  async createMany(
    @Body(new ParseArrayPipe({ items: CreatePersonDto }))
    createPersonsDto: CreatePersonDto[],
  ) {
    const persons = [];
    for (const createPersonDto of createPersonsDto) {
      const person = await this.personModel.create(createPersonDto);
      persons.push(person);
    }
    return persons;
  }

  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(+id);
  }*/
}
