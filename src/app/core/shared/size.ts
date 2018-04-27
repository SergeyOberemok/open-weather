export class Size {
    width: number;
    height: number;

    constructor(params = null) {
        try {
            this.width = params.width;
            this.height = params.height;
        } catch (error) {
            this.reset();
        }
    }

    private reset(): void {
        this.width = 0;
        this.height = 0;
    }

    public getHeightBy(percentage: number): number {
        return this.height * percentage / 100;
    }
}
