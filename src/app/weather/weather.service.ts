import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { mergeMap, switchMap, map, toArray, finalize } from 'rxjs/operators';

import { WeatherResponse, Weather } from './shared/shared';
import { City } from '../core/shared/shared';

@Injectable()
export class WeatherService {
    public readonly count: number = 16;
    public weatherList: BehaviorSubject<Weather[]> = null;
    selectedWeather: BehaviorSubject<Weather> = null;
    public isFetching: boolean;

    constructor(private http: HttpClient) {
        this.weatherList = new BehaviorSubject(null);
        this.selectedWeather = new BehaviorSubject(null);
    }

    public fetchWeather(params: { city: City, units: string }): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.isFetching = true;

            this.http.get<WeatherResponse>('api/weather', {
                params: {
                    id: params.city.cityId.toString(),
                    units: params.units,
                    cnt: this.count.toString(),
                    APPID: '20d559b664f9034282a8eabb87c91c30'
                }
            })
                .pipe(
                    switchMap(response => from(response.list)),
                    map(weather => Object.assign(new Weather(), weather)),
                    toArray(),
                    finalize(() => this.isFetching = false)
                )
                .subscribe(
                    weatherList => {
                        this.weatherList.next(weatherList);

                        if (weatherList.length > 0) {
                            this.selectWeather(0);
                        }

                        resolve();
                    },
                    error => {
                        console.error(error);
                        reject();
                    }
                );
        });
    }

    public selectWeather(index: number): void {
        this.selectedWeather.next(this.weatherList.getValue()[index]);
    }

}
