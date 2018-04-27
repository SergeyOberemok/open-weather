import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindGraphComponent } from './wind-graph.component';

describe('WindGraphComponent', () => {
  let component: WindGraphComponent;
  let fixture: ComponentFixture<WindGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
