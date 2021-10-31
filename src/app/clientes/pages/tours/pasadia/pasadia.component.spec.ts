import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasadiaComponent } from './pasadia.component';

describe('PasadiaComponent', () => {
  let component: PasadiaComponent;
  let fixture: ComponentFixture<PasadiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasadiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasadiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
