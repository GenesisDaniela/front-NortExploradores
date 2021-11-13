import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesRutasComponent } from './des-rutas.component';

describe('DesRutasComponent', () => {
  let component: DesRutasComponent;
  let fixture: ComponentFixture<DesRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesRutasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
