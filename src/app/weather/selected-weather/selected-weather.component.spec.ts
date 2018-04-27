import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedWeatherComponent } from './selected-weather.component';

describe('SelectedWeatherComponent', () => {
  let component: SelectedWeatherComponent;
  let fixture: ComponentFixture<SelectedWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
