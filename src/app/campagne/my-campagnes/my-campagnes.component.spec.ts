import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCampagnesComponent } from './my-campagnes.component';

describe('MyCampagnesComponent', () => {
  let component: MyCampagnesComponent;
  let fixture: ComponentFixture<MyCampagnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCampagnesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCampagnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
