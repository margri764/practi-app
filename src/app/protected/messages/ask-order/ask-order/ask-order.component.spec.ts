import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskOrderComponent } from './ask-order.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';

describe('AskOrderComponent', () => {
  let component: AskOrderComponent;
  let fixture: ComponentFixture<AskOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskOrderComponent ],
      imports: [MatDialogModule, HttpClientTestingModule, StoreModule.forRoot({}), MaterialModule],
      providers:[
        {provide: MatDialogRef, useValue: {} },
        provideMockStore({ initialState: {} }), 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
