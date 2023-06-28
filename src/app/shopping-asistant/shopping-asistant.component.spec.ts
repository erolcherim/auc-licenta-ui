import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingAsistantComponent } from './shopping-asistant.component';

describe('ShoppingAsistantComponent', () => {
  let component: ShoppingAsistantComponent;
  let fixture: ComponentFixture<ShoppingAsistantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingAsistantComponent]
    });
    fixture = TestBed.createComponent(ShoppingAsistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
