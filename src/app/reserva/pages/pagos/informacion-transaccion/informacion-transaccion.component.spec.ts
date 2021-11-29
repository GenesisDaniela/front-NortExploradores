import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionTransaccionComponent } from './informacion-transaccion.component';

describe('InformacionTransaccionComponent', () => {
  let component: InformacionTransaccionComponent;
  let fixture: ComponentFixture<InformacionTransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionTransaccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
