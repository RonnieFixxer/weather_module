import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Part {
  CURRENT = 'current',
  MINUTELY = 'minutely',
  HOURLY = 'hourly',
  DAILY = 'daily',
  ALERTS = 'alerts',
}

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  coord: {
    lon: number;
    lat: number;
  };

  @Column({ type: 'jsonb' })
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];

  @Column()
  base: string;

  @Column({ type: 'jsonb' })
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };

  @Column()
  visibility: number;

  @Column({ type: 'jsonb' })
  wind: {
    speed: number;
    deg: number;
  };

  @Column({ type: 'jsonb' })
  clouds: {
    all: number;
  };

  @Column()
  dt: number;

  @Column({ type: 'jsonb' })
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };

  @Column()
  timezone: number;

  @Column()
  record_id: number;

  @Column()
  name: string;

  @Column()
  cod: number;

  @Column({
    type: 'text',
    array: true,
    enum: Part,
    default: []
  })
  part: Part[];
}
