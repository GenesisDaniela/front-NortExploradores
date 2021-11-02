import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaqueteComponent } from './add-paquete.component';

describe('AddPaqueteComponent', () => {
  let component: AddPaqueteComponent;
  let fixture: ComponentFixture<AddPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaqueteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
