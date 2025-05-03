import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchListDetailComponent } from './pitch-list-detail.component';

describe('PitchListDetailComponent', () => {
  let component: PitchListDetailComponent;
  let fixture: ComponentFixture<PitchListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PitchListDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PitchListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
