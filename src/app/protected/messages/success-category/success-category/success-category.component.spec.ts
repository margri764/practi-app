import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCategoryComponent } from './success-category.component';
import { InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/app/material/material.module';

describe('SuccessCategoryComponent', () => {
  let component: SuccessCategoryComponent;
  let fixture: ComponentFixture<SuccessCategoryComponent>;
  const matDialogDataMock = 'fries';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessCategoryComponent ],
      imports:[HttpClientTestingModule, StoreModule.forRoot({}), MaterialModule  ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },
        {provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState: {} }),      
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
