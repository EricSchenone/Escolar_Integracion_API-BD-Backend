import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CityService {

  constructor(@InjectRepository(City)
  private readonly cityRepository: Repository<City>) {
  }

  async getAllCities() : Promise<City[]> {
    const cities: City[] = await this.cityRepository.find()
    return cities;
  }

  async getCityById (id: number) : Promise<City> {
    try {
      const criteria: FindOneOptions = { where: { id_city: id}}
      const city: City = await this.cityRepository.findOne( criteria );
      if(city) return city;
      throw new Error('No exite ninguna ciudad con el id:' + id)
    } catch (error) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND,
      error : 'Error en la busqueda de ciudad' + error},
      HttpStatus.NOT_FOUND);
    }
  }


}
