import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskTempOrderComponent } from './ask-temp-order.component';

describe('AskTempOrderComponent', () => {
  let component: AskTempOrderComponent;
  let fixture: ComponentFixture<AskTempOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskTempOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskTempOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
