import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, Put } from '@nestjs/common';
import { CityService } from './city.service';
import { CityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Post()
  createCity(@Body() city: CityDto): Promise<City> {
    return this.cityService.createCity(city);
  }

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

  @Put(':id')
  async updateCity(
    @Param(('id'), new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number,
    @Body() city: CityDto): Promise<City> {
    return this.cityService.updateCity(id, city);
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
