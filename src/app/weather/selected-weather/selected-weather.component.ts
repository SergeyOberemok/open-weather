import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';

import { City } from '../../core/shared/shared';
import { Weather, Units } from '../shared/shared';
import { WeatherService } from '../weather.service';
import { CitiesService } from '../../core/cities.service';

@Component({
    selector: 'wea-selected-weather',
    templateUrl: './selected-weather.component.html',
    styleUrls: ['./selected-weather.component.scss']
})
export class SelectedWeatherComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = null;
    public city: City = null;
    public weather: Weather = null;
    @Input() units: Units;

    constructor(
        private weatherService: WeatherService,
        private citiesService: CitiesService
    ) {
        this.subscriptions = [];
        this.city = new City();
        this.weather = new Weather();
    }

    ngOnInit() {
        this.subscriptions.push(this.citiesService.selectedCity
            .pipe(filter(city => city !== null))
            .subscribe(city => this.city = city)
        );

        this.subscriptions.push(this.weatherService.selectedWeather
            .pipe(filter(weather => weather !== null))
            .subscribe(weather => this.weather = weather)
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
