import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongActionMessageComponent } from './wrong-action-message.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

describe('WrongActionMessageComponent', () => {
  let component: WrongActionMessageComponent;
  let fixture: ComponentFixture<WrongActionMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongActionMessageComponent ],
      imports:[MaterialModule],
      providers:[
        {provide: MatDialogRef, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrongActionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
