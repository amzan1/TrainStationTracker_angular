import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsSearchComponent } from './trips-search.component';

describe('TripsSearchComponent', () => {
  let component: TripsSearchComponent;
  let fixture: ComponentFixture<TripsSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripsSearchComponent]
    });
    fixture = TestBed.createComponent(TripsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
