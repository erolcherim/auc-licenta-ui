import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteGridComponent } from './favorite-grid.component';

describe('FavoriteGridComponent', () => {
  let component: FavoriteGridComponent;
  let fixture: ComponentFixture<FavoriteGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteGridComponent]
    });
    fixture = TestBed.createComponent(FavoriteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
