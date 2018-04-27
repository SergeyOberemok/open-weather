export class City {
    id: number;
    name: string;
    coord?: { lat: number, lon: number };
    country: string;
    cityId?: number;

    constructor() {
        this.id = 0;
        this.name = '';
        this.country = '';
    }
}
