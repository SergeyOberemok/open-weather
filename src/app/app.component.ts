import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, switchMap, merge, filter } from 'rxjs/operators';

import { City } from './core/shared/shared';
import { CitiesService } from './core/cities.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public city: City;
    public isCollapsed: boolean;

    constructor(
        private citiesService: CitiesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.isCollapsed = true;

        this.router.navigate(['/']);
    }

    public getTypeaheadHandler(): ((name: Observable<string>) => Observable<City[]>) {
        return this.search.bind(this);
    }

    private search(letters: Observable<string>): Observable<City[]> {
        return letters.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            filter(name => name.length > 2),
            switchMap(name => this.citiesService.search(name)),
            merge()
        );
    }

    public cityChanged($event: any): void {
        if (this.city.id !== undefined && this.city.id > 0) {
            this.citiesService.fetchCity(this.city.id).then(() => {
                this.router.navigate(['/weather/temperature']);
            });
        }
    }

    public formatter(city: City): string {
        return `${city.name}, ${city.country}`;
    }

    public get isSearching(): boolean {
        return this.citiesService.isSearching;
    }

    public get isAppRoute(): boolean {
        return this.router.url.length === 1;
    }
}
