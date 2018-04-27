import * as d3 from 'd3';
import { Size, Position } from '../../core/shared/shared';

export class Bar {
    public static readonly PADDING_Y = 5;
    public static readonly PADDING_BOTTOM = 25;
    public static readonly SCALE = 0.7;

    value: number;
    min?: number;
    max?: number;
    date: string;

    size: Size;
    position: Position;

    constructor(params: any = null) {
        try {
            this.value = params.value;
            this.date = params.date;
            this.setMin(params.min);
            this.setMax(params.max);
        } catch (error) {
            this.reset();
        }

        this.size = new Size();
        this.position = new Position();
    }

    private reset(): void {
        this.value = 0;
        this.date = '';
    }

    public setMin(min: number): void {
        if (min !== null && min !== undefined) {
            this.min = min;
        }
    }

    public setMax(max: number): void {
        if (max !== null && max !== undefined) {
            this.max = max;
        }
    }

    public getPosition(width: number, index: number): number {
        return index * width + index * Bar.PADDING_Y - Bar.PADDING_Y;
    }

    public getXLabel(): string {
        return `${this.date.substr(8, 2)} ${this.date.substr(11, 5)}`;
    }
}
