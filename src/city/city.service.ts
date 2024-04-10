import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { FindManyOptions, FindOneOptions, QueryFailedError, Repository } from 'typeorm';
import { CityDto } from './dto/create-city.dto';

@Injectable()
export class CityService {

  constructor(@InjectRepository(City)
  private readonly cityRepository: Repository<City>) {
  }

  async createCity(cityDto: CityDto): Promise<City> {
    try {
      const city: City = new City(cityDto.name);
      city.setName(cityDto.name);
      const savedCity = await this.cityRepository.save(city);
      if (savedCity.getIdCity()) return city;
      throw new Error('No se pudo crear la ciudad');
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en el registro de la ciudad en la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error en el resgistro de la ciudad'
      },
        HttpStatus.BAD_REQUEST)
    }
  }

  async getAllCities(): Promise<City[]> {
    let criteria: FindManyOptions = { relations: ['classes']}
    const cities: City[] = await this.cityRepository.find(criteria)
    return cities;
  }

  async getCityById(id: number): Promise<City> {
    try {
      const criteria: FindOneOptions = { relations: ['classes'], where: { id_city: id } }
      const city: City = await this.cityRepository.findOne(criteria);
      if (city) return city;
      throw new Error('No exite ninguna ciudad con el id:' + id)
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la consulta a la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'No existe una ciudad con el id:' + id
      },
        HttpStatus.BAD_REQUEST)
    }
  }

  async updateCity(id: number, cityDto: CityDto): Promise<City> {
    try {
      const criteria: FindOneOptions = { where: { id_city: id } };
      let updateCity = await this.cityRepository.findOne(criteria);
      updateCity.setName(cityDto.name);
      updateCity = await this.cityRepository.save(updateCity);
      return updateCity;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la actualizacion de la ciudad en la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Error en la actualizacion, no se encuentra una cuidad con id:' + id
      },
        HttpStatus.BAD_REQUEST)
    }
  }

  async deleteCity(id: number): Promise<void> {
    try {
      const criteria: FindOneOptions = { where: { id_city: id } };
      const city: City = await this.cityRepository.findOne(criteria)
      if (!city) throw new NotFoundException('No existe una escuela con el id:' + id)
      await this.cityRepository.delete(city.getIdCity());
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error en la eliminación de la ciudad en la base de datos'
        },
          HttpStatus.INTERNAL_SERVER_ERROR)
      };
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la eliminación de la ciudad'
      },
        HttpStatus.NOT_FOUND)
    }
  }

}
