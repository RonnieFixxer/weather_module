import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Part, Weather } from './entities/weather.entity';

export interface Coordinates {
  coord: {
    lat: string | undefined;
    lon: string | undefined;
  };
  part: Part[] | [];
}
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  create(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('part') part: string,
  ) {
    const conditions: Coordinates = {
      coord: {
        lat,
        lon,
      },
      part: part?.split(',') as Part[],
    };

    return this.weatherService.create(conditions);
  }

  @Get()
  findOne(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('part') part: string,
  ) {
    const conditions: Coordinates = {
      coord: {
        lat,
        lon,
      },
      part: part?.split(',') as Part[],
    };
    return this.weatherService.findOne(conditions);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weatherService.remove(+id);
  }
}
