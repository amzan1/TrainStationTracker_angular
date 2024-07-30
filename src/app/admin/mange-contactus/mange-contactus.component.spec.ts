import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeContactusComponent } from './mange-contactus.component';

describe('MangeContactusComponent', () => {
  let component: MangeContactusComponent;
  let fixture: ComponentFixture<MangeContactusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangeContactusComponent]
    });
    fixture = TestBed.createComponent(MangeContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
