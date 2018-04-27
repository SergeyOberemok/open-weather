import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { map, filter, debounceTime } from 'rxjs/operators';
import * as d3 from 'd3';

import { Bar, BarList } from '../shared/shared';
import { Size, Margin } from '../../core/shared/shared';
import { D3Service } from '../d3.service';

@Component({
    selector: 'd3c-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
    private subscriptions: Subscription[] = null;
    @Input() barList: BarList;
    private margin: Margin = null;
    @Output('barSelected') barSelectedEvent: EventEmitter<number> = new EventEmitter();

    constructor(private d3Service: D3Service) {
        this.subscriptions = [];
        this.margin = new Margin();
        d3Service.reset();
    }

    ngOnInit() {
        this.margin.top = 40;
        this.margin.left = 50;

        this.subscriptions.push(this.d3Service.componentState
            .pipe(
                filter(state => state.isNotEmpty && state.isAfterView),
                debounceTime(100)
            )
            .subscribe(state => this.generateGraph(this.barList))
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    ngAfterViewInit() {
        this.d3Service.changeAfterView(true);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.barList !== undefined && changes.barList.currentValue.list.length > 0) {
            this.d3Service.changeNotEmpty(true);
        }
    }

    private generateGraph(bars: BarList): void {
        const svg = d3.select('svg.chart');
        const svgSize = new Size({
            width: (svg.node() as Element).getBoundingClientRect().width,
            height: (svg.node() as Element).getBoundingClientRect().height
        });
        const barsSize = new Size({
            width: svgSize.width - this.margin.left,
            height: svgSize.height - this.margin.top * 2
        });
        bars.setFullSize(barsSize);

        this.setAxisXandY({
            svg: svg,
            svgSize: svgSize,
            xAxisLabels: bars.list.map(bar => bar.getXLabel()),
            yAxisValues: {
                min: bars.min - 1,
                max: bars.max + ((1 - Bar.SCALE) * bars.max / 100) + 1
            }
        });

        this.setBars({
            svg: svg,
            list: bars.list
        });
    }

    private setAxisXandY(params: { svg: any, svgSize: Size, xAxisLabels: string[], yAxisValues: { min: number, max: number } }): void {
        const x = d3.scaleBand().rangeRound([0, params.svgSize.width - this.margin.left + 10]);
        const y = d3.scaleLinear().rangeRound([params.svgSize.height - this.margin.top * 2, 0]);

        x.domain(params.xAxisLabels);
        y.domain([params.yAxisValues.min, params.yAxisValues.max]);

        params.svg.selectAll('g.axis').remove();

        params.svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', `translate(${this.margin.left - 5}, ${params.svgSize.height - this.margin.top + 10})`)
            .call(d3.axisBottom(x));

        params.svg.append('g')
            .attr('class', 'axis axis--y')
            .attr('transform', `translate(${this.margin.left - 10}, ${this.margin.top})`)
            .call(d3.axisLeft(y).ticks(10, ''))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em');
    }

    private setBars(params: { svg: any, list: Bar[] }): void {
        const svgG = params.svg.select('g.bars')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        const rects = svgG.selectAll('rect.bar')
            .data(params.list);

        rects.attr('width', (bar, index) => bar.size.width)
            .attr('height', (bar, index) => bar.size.height)
            .attr('x', (bar, i) => bar.position.x)
            .attr('y', (bar, i) => bar.position.y);
    }

    public barClicked($event: any, index: number): void {
        this.barSelectedEvent.emit(index);
    }

}
