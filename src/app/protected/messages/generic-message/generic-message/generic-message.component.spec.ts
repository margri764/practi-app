import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericMessageComponent } from './generic-message.component';

describe('GenericMessageComponent', () => {
  let component: GenericMessageComponent;
  let fixture: ComponentFixture<GenericMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
