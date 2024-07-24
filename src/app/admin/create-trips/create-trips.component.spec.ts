import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTripsComponent } from './create-trips.component';

describe('CreateTripsComponent', () => {
  let component: CreateTripsComponent;
  let fixture: ComponentFixture<CreateTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTripsComponent]
    });
    fixture = TestBed.createComponent(CreateTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
