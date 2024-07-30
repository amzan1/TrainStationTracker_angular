import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainStationsComponent } from './train-stations.component';

describe('TrainStationsComponent', () => {
  let component: TrainStationsComponent;
  let fixture: ComponentFixture<TrainStationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainStationsComponent]
    });
    fixture = TestBed.createComponent(TrainStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
