import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectorPopupComponent } from './multiple-selector-popup.component';

describe('MultipleSelectorPopupComponent', () => {
  let component: MultipleSelectorPopupComponent;
  let fixture: ComponentFixture<MultipleSelectorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleSelectorPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleSelectorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
