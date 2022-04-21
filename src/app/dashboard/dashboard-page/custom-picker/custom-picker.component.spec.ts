import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPickerComponent } from './custom-picker.component';

describe('CustomPickerComponent', () => {
  let component: CustomPickerComponent;
  let fixture: ComponentFixture<CustomPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
