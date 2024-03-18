import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
/*
  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }
*/
  @Get()
  getAllCities() {
    return this.cityService.getAllCities();
  }

  @Get(':id')
  async getCityById(
    @Param('id', new ParseIntPipe({ 
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE 
    })) id: number) {
    return this.cityService.getCityById(id);
  }
/*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }*/
}
