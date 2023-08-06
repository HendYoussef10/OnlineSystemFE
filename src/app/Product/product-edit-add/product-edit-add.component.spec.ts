import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditAddComponent } from './product-edit-add.component';

describe('ProductEditAddComponent', () => {
  let component: ProductEditAddComponent;
  let fixture: ComponentFixture<ProductEditAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEditAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
