import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempOrderComponent } from './temp-order.component';

describe('TempOrderComponent', () => {
  let component: TempOrderComponent;
  let fixture: ComponentFixture<TempOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
