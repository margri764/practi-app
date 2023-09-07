import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantainMessageComponent } from './mantain-message.component';

describe('MantainMessageComponent', () => {
  let component: MantainMessageComponent;
  let fixture: ComponentFixture<MantainMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantainMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantainMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
