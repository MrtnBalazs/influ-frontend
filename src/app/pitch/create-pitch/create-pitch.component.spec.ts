import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePitchComponent } from './create-pitch.component';

describe('CreatePitchComponent', () => {
  let component: CreatePitchComponent;
  let fixture: ComponentFixture<CreatePitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
