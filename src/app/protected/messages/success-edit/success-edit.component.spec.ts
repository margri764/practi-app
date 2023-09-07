import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessEditComponent } from './success-edit.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/app/material/material.module';


const matDialogDataMock = 'fries';

describe('SuccessEditComponent', () => {
  let component: SuccessEditComponent;
  let fixture: ComponentFixture<SuccessEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessEditComponent ],
      imports: [MatDialogModule, HttpClientTestingModule, StoreModule.forRoot({}), MaterialModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock}},
        {provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState: {} }), 
      ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
