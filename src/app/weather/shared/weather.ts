import { Bar } from '../../d3/shared/bar';
import { BarFactory } from '../../d3/shared/shared';

export class Weather {
    dt: number;
    main: {
        temp: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        sea_level: number,
        grnd_level: number,
        humidity: number,
        temp_kf: number
    };
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    }[];
    clouds: {
        all: number
    };
    wind: {
        speed: number,
        deg: number
    };
    rain: {
        '3h': number
    };
    dt_txt: string;

    constructor() {
        this.dt = (new Date()).getTime();
        this.main = {
            temp: 0,
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            sea_level: 0,
            grnd_level: 0,
            humidity: 0,
            temp_kf: 0
        };
        this.weather = [];
        this.clouds = {
            all: 0
        };
        this.wind = {
            speed: 0,
            deg: 0
        };
        this.rain = {
            '3h': 0
        };
        this.dt_txt = '';
    }

    public get description(): string {
        if (this.weather.length > 0) {
            return this.weather[0].description;
        }
        return '';
    }

    public get icon(): string {
        let name = '';

        if (this.weather.length > 0) {
            name = this.weather[0].icon;
        }

        if (name.length > 0) {
            return `/assets/images/${name.replace('n', 'd')}.png`;
        }
        return '';
    }

}
