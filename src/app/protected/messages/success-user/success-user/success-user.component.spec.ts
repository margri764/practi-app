import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessUserComponent } from './success-user.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

describe('SuccessUserComponent', () => {
  let component: SuccessUserComponent;
  let fixture: ComponentFixture<SuccessUserComponent>;
  const matDialogDataMock = 'fries';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessUserComponent ],
      imports:[MaterialModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },
        {provide: MatDialogRef, useValue: {} },
      ],

      
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
