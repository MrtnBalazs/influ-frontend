import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCampagnesComponent } from './saved-campagnes.component';

describe('SavedCampagnesComponent', () => {
  let component: SavedCampagnesComponent;
  let fixture: ComponentFixture<SavedCampagnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedCampagnesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedCampagnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
