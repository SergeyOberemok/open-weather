import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherComponent } from './weather.component';
import { WindGraphComponent } from './wind-graph/wind-graph.component';
import { TemperatureGraphComponent } from './temperature-graph/temperature-graph.component';
import { PresureGraphComponent } from './presure-graph/presure-graph.component';
import { HumidityGraphComponent } from './humidity-graph/humidity-graph.component';

const routes: Routes = [
    {
        path: 'weather', component: WeatherComponent, children: [
            { path: 'wind', component: WindGraphComponent },
            { path: 'temperature', component: TemperatureGraphComponent },
            { path: 'presure', component: PresureGraphComponent },
            { path: 'humidity', component: HumidityGraphComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WeatherRoutingModule { }
