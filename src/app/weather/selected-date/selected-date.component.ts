import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';

import { Weather } from '../shared/shared';
import { WeatherService } from '../weather.service';

@Component({
    selector: 'wea-selected-date',
    templateUrl: './selected-date.component.html',
    styleUrls: ['./selected-date.component.scss']
})
export class SelectedDateComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = null;
    public weather: Weather = null;

    constructor(private weatherService: WeatherService) {
        this.subscriptions = [];
        this.weather = new Weather();
    }

    ngOnInit() {
        this.subscriptions.push(this.weatherService.selectedWeather
            .pipe(filter(weather => weather !== null))
            .subscribe(weather => this.weather = weather));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
