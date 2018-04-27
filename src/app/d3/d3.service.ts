import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class D3Service {
    public componentState: BehaviorSubject<{ isNotEmpty: boolean, isAfterView: boolean }> = null;
    private state: { isNotEmpty: boolean, isAfterView: boolean } = null;

    constructor() {
        this.state = { isNotEmpty: false, isAfterView: false };
        this.componentState = new BehaviorSubject(this.state);
    }

    public changeAfterView(value: boolean) {
        this.state.isAfterView = value;
        this.componentState.next(Object.assign({}, this.state));
    }

    public changeNotEmpty(value: boolean) {
        this.state.isNotEmpty = value;
        this.componentState.next(Object.assign({}, this.state));
    }

    public reset() {
        this.state = { isNotEmpty: false, isAfterView: false };
        this.componentState.next(Object.assign({}, this.state));
    }

    public redraw() {
        this.componentState.next(Object.assign({}, this.state));
    }

}
