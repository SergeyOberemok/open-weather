import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WeatherService } from './weather.service';
import { SelectedWeatherComponent } from './selected-weather/selected-weather.component';
import { TemperatureGraphComponent } from './temperature-graph/temperature-graph.component';
import { WeatherComponent } from './weather.component';
import { WindGraphComponent } from './wind-graph/wind-graph.component';
import { PresureGraphComponent } from './presure-graph/presure-graph.component';
import { HumidityGraphComponent } from './humidity-graph/humidity-graph.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { D3Module } from '../d3/d3.module';
import { SelectedDateComponent } from './selected-date/selected-date.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        WeatherRoutingModule,
        D3Module
    ],
    declarations: [
        SelectedWeatherComponent,
        TemperatureGraphComponent,
        WeatherComponent,
        WindGraphComponent,
        PresureGraphComponent,
        HumidityGraphComponent,
        SelectedDateComponent
    ],
    providers: [WeatherService],
    exports: []
})
export class WeatherModule { }
