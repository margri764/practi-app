import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskDelClientComponent } from './ask-del-client.component';

describe('AskDelClientComponent', () => {
  let component: AskDelClientComponent;
  let fixture: ComponentFixture<AskDelClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskDelClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskDelClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
