import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadiaComponent } from './estadia.component';

describe('EstadiaComponent', () => {
  let component: EstadiaComponent;
  let fixture: ComponentFixture<EstadiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
