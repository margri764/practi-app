import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSuccessComponent } from './generic-success.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

describe('GenericSuccessComponent', () => {
  let component: GenericSuccessComponent;
  let fixture: ComponentFixture<GenericSuccessComponent>;
  const matDialogDataMock = 'fries';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericSuccessComponent ],
      imports: [MaterialModule],
      providers: [
                {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },
                {provide: MatDialogRef, useValue: {} },
                 ], 

    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
