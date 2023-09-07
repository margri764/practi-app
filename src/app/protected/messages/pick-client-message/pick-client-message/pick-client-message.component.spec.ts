import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickClientMessageComponent } from './pick-client-message.component';

describe('PickClientMessageComponent', () => {
  let component: PickClientMessageComponent;
  let fixture: ComponentFixture<PickClientMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickClientMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickClientMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
