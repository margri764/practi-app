import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPermissionMessageComponent } from './no-permission-message.component';

describe('NoPermissionMessageComponent', () => {
  let component: NoPermissionMessageComponent;
  let fixture: ComponentFixture<NoPermissionMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoPermissionMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoPermissionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
