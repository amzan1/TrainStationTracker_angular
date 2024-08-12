import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedNavbarComponent } from './signed-navbar.component';

describe('SignedNavbarComponent', () => {
  let component: SignedNavbarComponent;
  let fixture: ComponentFixture<SignedNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignedNavbarComponent]
    });
    fixture = TestBed.createComponent(SignedNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
