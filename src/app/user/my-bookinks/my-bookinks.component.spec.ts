import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookinksComponent } from './my-bookinks.component';

describe('MyBookinksComponent', () => {
  let component: MyBookinksComponent;
  let fixture: ComponentFixture<MyBookinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBookinksComponent]
    });
    fixture = TestBed.createComponent(MyBookinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
