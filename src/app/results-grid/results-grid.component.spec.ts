import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsGridComponent } from './results-grid.component';

describe('ResultsGridComponent', () => {
  let component: ResultsGridComponent;
  let fixture: ComponentFixture<ResultsGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsGridComponent]
    });
    fixture = TestBed.createComponent(ResultsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
