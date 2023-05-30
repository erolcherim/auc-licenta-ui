import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidGridComponent } from './bid-grid.component';

describe('BidGridComponent', () => {
  let component: BidGridComponent;
  let fixture: ComponentFixture<BidGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidGridComponent]
    });
    fixture = TestBed.createComponent(BidGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
