import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { D3Service } from './d3.service';
import { GraphComponent } from './graph/graph.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [GraphComponent],
    providers: [D3Service],
    exports: [GraphComponent]
})
export class D3Module { }
