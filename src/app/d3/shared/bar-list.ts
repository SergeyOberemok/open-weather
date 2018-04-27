import { Bar } from './bar';
import { Size } from '../../core/shared/shared';

export class BarList {
    private bars: Bar[];
    private fullSize: Size;
    private minValue: number;
    private maxValue: number;
    private difference: number;

    constructor(bars: Bar[] = []) {
        this.bars = bars;
        this.fullSize = new Size();

        const values: number[] = this.bars.map(bar => bar.value);
        this.minValue = Math.min.apply(null, values);
        this.maxValue = Math.max.apply(null, values);
        this.difference = this.maxValue - this.minValue;
    }

    public setFullSize(size: Size): void {
        this.fullSize = size;

        this.bars = this.setPositionTo(this.setSizeTo(this.bars));
    }

    private setSizeTo(bars: Bar[]): Bar[] {
        const width = this.getBarWidth();
        bars.forEach(bar => {
            bar.size.width = width;
            bar.size.height = this.getBarHeight(bar.value);
        });

        return bars;
    }

    private getBarWidth(): number {
        return (this.fullSize.width - (this.bars.length * Bar.PADDING_Y - Bar.PADDING_Y)) / this.bars.length;
    }

    private getBarHeight(value: number): number {
        const percentage = (value - this.minValue) * 100 / this.difference;

        return this.fullSize.getHeightBy(percentage * Bar.SCALE) + Bar.PADDING_BOTTOM;
    }

    private setPositionTo(bars: Bar[]): Bar[] {
        for (let i = 0; i < bars.length; i++) {
            const bar = bars[i];
            if (i > 0) {
                bar.position.x = Math.floor(i * bar.size.width) + (Bar.PADDING_Y * i);
            }
            bar.position.y = this.fullSize.height - bar.size.height;
        }

        return bars;
    }

    public get list(): Bar[] {
        return this.bars;
    }

    public get max(): number {
        return this.maxValue;
    }

    public get min(): number {
        return this.minValue;
    }

}
