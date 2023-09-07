import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskPriceComponent } from './ask-price.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';


const matDialogDataMock = 'fries';

describe('AskPriceComponent', () => {
  let component: AskPriceComponent;
  let fixture: ComponentFixture<AskPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskPriceComponent ],
      imports: [HttpClientTestingModule, StoreModule.forRoot({}), MaterialModule],
      providers: [
                {provide: MAT_DIALOG_DATA, useValue: {matDialogDataMock} },
                {provide: MatDialogRef, useValue: {} },
                provideMockStore({ initialState: {} }),
                 ], 

    })
    .compileComponents();

    fixture = TestBed.createComponent(AskPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
