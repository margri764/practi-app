import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorBackendDownComponent } from './error-backend-down.component';

describe('ErrorBackendDownComponent', () => {
  let component: ErrorBackendDownComponent;
  let fixture: ComponentFixture<ErrorBackendDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorBackendDownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorBackendDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
