import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPitchesComponent } from './my-pitches.component';

describe('MyPitchesComponent', () => {
  let component: MyPitchesComponent;
  let fixture: ComponentFixture<MyPitchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPitchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPitchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
