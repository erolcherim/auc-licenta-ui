import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteListingComponent } from './delete-listing.component';

describe('DeleteListingComponent', () => {
  let component: DeleteListingComponent;
  let fixture: ComponentFixture<DeleteListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteListingComponent]
    });
    fixture = TestBed.createComponent(DeleteListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
