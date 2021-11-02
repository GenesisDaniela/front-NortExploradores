import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlojamientoComponent } from './add-alojamiento.component';

describe('AddAlojamientoComponent', () => {
  let component: AddAlojamientoComponent;
  let fixture: ComponentFixture<AddAlojamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlojamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
