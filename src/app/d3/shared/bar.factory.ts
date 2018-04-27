import { Weather } from '../../weather/shared/shared';
import { Bar } from './bar';

export class BarFactory {
    public static createWindBar(weather: Weather): Bar {
        return new Bar({
            value: weather.wind.speed,
            date: weather.dt_txt
        });
    }

    public static createTemperatureBar(weather: Weather): Bar {
        return new Bar({
            value: weather.main.temp,
            date: weather.dt_txt,
            min: weather.main.temp_min,
            max: weather.main.temp_max
        });
    }

    public static createPresureBar(weather: Weather): Bar {
        return new Bar({
            value: weather.main.pressure,
            date: weather.dt_txt
        });
    }

    public static createHumidityBar(weather: Weather): Bar {
        return new Bar({
            value: weather.main.humidity,
            date: weather.dt_txt
        });
    }
}
