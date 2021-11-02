import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAliadoComponent } from './add-aliado.component';

describe('AddAliadoComponent', () => {
  let component: AddAliadoComponent;
  let fixture: ComponentFixture<AddAliadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAliadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
