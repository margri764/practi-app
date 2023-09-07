import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { AskEditComponent } from './ask-edit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';

describe('AskEditComponent', () => {
  let component: AskEditComponent;
  let fixture: ComponentFixture<AskEditComponent>;
  const matDialogDataMock = 'fries';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskEditComponent ],
      imports:[HttpClientTestingModule, StoreModule.forRoot({}), MaterialModule],
      providers:[
        {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },
        {provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState: {} }), 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
