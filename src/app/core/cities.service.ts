import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map, finalize } from 'rxjs/operators';

import { City } from './shared/shared';

@Injectable()
export class CitiesService {
    public selectedCity: BehaviorSubject<City> = null;
    public isSearching: boolean;
    public isFetching: boolean;

    constructor(private http: HttpClient) {
        this.selectedCity = new BehaviorSubject(null);
    }

    public search(name: string): Observable<City[]> {
        this.isSearching = true;

        return this.http.get<{ data: City[] }>('api/cities', { params: { name: name } })
            .pipe(
                map(response => response.data),
                finalize(() => this.isSearching = false)
            );
    }

    public fetchCity(id: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.isFetching = true;

            this.http.get<{ data: City }>(`api/cities/${id}`)
                .pipe(
                    map(response => response.data),
                    map(city => Object.assign(new City(), city)),
                    finalize(() => this.isFetching = false)
                )
                .subscribe(
                    city => {
                        this.selectedCity.next(city);
                        resolve();
                    },
                    error => {
                        console.error(error);
                        reject();
                    });
        });
    }

}
