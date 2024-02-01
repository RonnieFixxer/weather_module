import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Weather } from './entities/weather.entity';
import { OPENWEATHER_URL, APPID } from './constants';
import { Coordinates } from './weather.controller';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
    private readonly httpService: HttpService,
  ) {}

  async create(conditions: Coordinates) {
    this.validateParams(conditions);

    const {
      coord: { lat, lon },
      part,
    } = conditions;
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `${OPENWEATHER_URL}?lat=${lat}&lon=${lon}&exclude=${part}&APPID=${APPID}`,
        )
        .pipe(
          catchError((error) => {
            throw `An error happened. Msg: ${JSON.stringify(
              error?.response?.data,
            )}`;
          }),
        ),
    );

    const myObject = { record_id: data.id };

    const updatedObject = Object.assign(data, {
      record_id: myObject.record_id,
      part,
    });
    console.log(updatedObject);
    delete updatedObject['id'];

    return this.weatherRepository.save(updatedObject);
  }

  async findOne(conditions: Coordinates): Promise<Weather> {
    this.validateParams(conditions);
    const {
      coord: { lat, lon },
      part,
    } = conditions;
    const queryBuilder = this.weatherRepository.createQueryBuilder('weather');
    console.log(part)
    queryBuilder
      .where("weather.coord ->> 'lat' = :lat", { lat: Number(lat) })
      .andWhere("weather.coord ->> 'lon' = :lon", { lon: Number(lon) }); // Replace with the actual value

      if (part && part.length > 0) {
        queryBuilder.andWhere('weather.part @> :part', { part:part})
      }

    return queryBuilder.getOne();
  }

  private validateParams(conditions: Coordinates): void {
    const {
      coord: { lat, lon },
    } = conditions;
    if (lat === undefined || lon === undefined) {
      throw new NotFoundException('Latitude and longitude are required.');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} weather`;
  }
}
