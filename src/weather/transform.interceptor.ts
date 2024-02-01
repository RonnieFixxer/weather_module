import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Weather } from './entities/weather.entity';

export class WeatherTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: Weather) => {
        return {
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          wind_speed: data.wind.speed,
        };
      }),
    );
  }
}
