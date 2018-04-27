export class Units {
    public static readonly METRIC = 'metric';
    public static readonly IMPERIAL = 'imperial';

    value: string;

    public static getTemperatureChar(unit: string): string {
        return unit === Units.METRIC ? 'C' : 'F';
    }

    public static getSpeedChar(unit: string): string {
        return unit === Units.METRIC ? 'm/s' : 'm/h';
    }

    constructor(unit: string = '') {
        if (unit.length > 0) {
            this.value = unit;
            return;
        }

        this.value = Units.METRIC;
    }

    public get currentTemperatureChar(): string {
        return Units.getTemperatureChar(this.value);
    }

    public get currentSpeedChar(): string {
        return Units.getSpeedChar(this.value);
    }

}
