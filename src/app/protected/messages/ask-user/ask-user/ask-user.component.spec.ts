import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskUserComponent } from './ask-user.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';


const matDialogDataMock = 'fries';

describe('AskUserComponent', () => {
  let component: AskUserComponent;
  let fixture: ComponentFixture<AskUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskUserComponent ],
      imports:[HttpClientTestingModule, StoreModule.forRoot({}), MatDialogModule, MaterialModule],
      providers: [
                {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },
                {provide: MatDialogRef, useValue: {} },
                provideMockStore({ initialState: {} }), 
              ], 

    })
    .compileComponents();

    fixture = TestBed.createComponent(AskUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
