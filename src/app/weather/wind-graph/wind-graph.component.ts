import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { from } from 'rxjs/observable/from';
import { filter, switchMap, map, toArray, take } from 'rxjs/operators';

import { WeatherService } from '../weather.service';
import { BarFactory, BarList } from '../../d3/shared/shared';

@Component({
    selector: 'wea-wind-graph',
    templateUrl: './wind-graph.component.html',
    styleUrls: ['./wind-graph.component.scss']
})
export class WindGraphComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = null;
    public barList: BarList = null;

    constructor(private weatherService: WeatherService) {
        this.subscriptions = [];
        this.barList = new BarList();
    }

    ngOnInit() {
        this.subscriptions.push(this.weatherService.weatherList
            .pipe(filter(weatherList => weatherList !== null))
            .subscribe(bars => this.barList = new BarList(bars.map(bar => BarFactory.createWindBar(bar))))
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    public changeSelectedWeather($event: number): void {
        this.weatherService.selectWeather($event);
    }

}
