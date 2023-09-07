import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskSendOrderComponent } from './ask-send-order.component';

describe('AskSendOrderComponent', () => {
  let component: AskSendOrderComponent;
  let fixture: ComponentFixture<AskSendOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskSendOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskSendOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
