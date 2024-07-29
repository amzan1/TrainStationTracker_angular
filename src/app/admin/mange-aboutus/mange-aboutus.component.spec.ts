import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeAboutusComponent } from './mange-aboutus.component';

describe('MangeAboutusComponent', () => {
  let component: MangeAboutusComponent;
  let fixture: ComponentFixture<MangeAboutusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangeAboutusComponent]
    });
    fixture = TestBed.createComponent(MangeAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
