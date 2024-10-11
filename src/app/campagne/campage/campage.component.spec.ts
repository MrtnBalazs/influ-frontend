import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampageComponent } from './campage.component';

describe('CampageComponent', () => {
  let component: CampageComponent;
  let fixture: ComponentFixture<CampageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
