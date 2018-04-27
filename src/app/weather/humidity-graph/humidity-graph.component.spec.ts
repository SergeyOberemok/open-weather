import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityGraphComponent } from './humidity-graph.component';

describe('HumidityGraphComponent', () => {
  let component: HumidityGraphComponent;
  let fixture: ComponentFixture<HumidityGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumidityGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumidityGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
