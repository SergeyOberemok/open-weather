import { City } from '../../core/shared/shared';
import { Weather } from './weather';

export interface WeatherResponse {
    cod: string;
    message: number;
    cnt: number;
    list: Weather[];
    city: City;
}
