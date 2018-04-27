import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresureGraphComponent } from './presure-graph.component';

describe('PresureGraphComponent', () => {
  let component: PresureGraphComponent;
  let fixture: ComponentFixture<PresureGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresureGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresureGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
