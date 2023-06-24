import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarListingComponent } from './similar-listing.component';

describe('SimilarListingComponent', () => {
  let component: SimilarListingComponent;
  let fixture: ComponentFixture<SimilarListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarListingComponent]
    });
    fixture = TestBed.createComponent(SimilarListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
