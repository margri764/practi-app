import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskOpenOrderComponent } from './ask-open-order.component';

describe('AskOpenOrderComponent', () => {
  let component: AskOpenOrderComponent;
  let fixture: ComponentFixture<AskOpenOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskOpenOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskOpenOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
