import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCampagnesComponent } from './all-campagnes.component';

describe('AllCampagnesComponent', () => {
  let component: AllCampagnesComponent;
  let fixture: ComponentFixture<AllCampagnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCampagnesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCampagnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
