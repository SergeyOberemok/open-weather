import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';

import { WeatherService } from './weather.service';
import { CitiesService } from '../core/cities.service';
import { City } from '../core/shared/city';
import { Units } from './shared/shared';
import { D3Service } from '../d3/d3.service';

@Component({
    selector: 'wea-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = null;
    public units: Units;
    private city: City = null;

    constructor(
        private weatherService: WeatherService,
        private citiesService: CitiesService,
        private router: Router,
        private d3Service: D3Service
    ) {
        this.subscriptions = [];
        this.units = new Units();
    }

    ngOnInit() {
        this.subscriptions.push(this.citiesService.selectedCity
            .pipe(filter(city => city !== null))
            .subscribe(city => {
                this.city = city;

                this.weatherService.fetchWeather({
                    city: city,
                    units: this.units.value
                });
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    public unitsChanged($event: any): void {
        this.citiesService.selectedCity.next(Object.assign(new City(), this.city));
    }

    public get isFetching(): boolean {
        return this.weatherService.isFetching;
    }

    public get imperialUnit(): string {
        return Units.IMPERIAL;
    }

    public get metricUnit(): string {
        return Units.METRIC;
    }

    public getTemperatureChar(unit: string): string {
        return Units.getTemperatureChar(unit);
    }

}
