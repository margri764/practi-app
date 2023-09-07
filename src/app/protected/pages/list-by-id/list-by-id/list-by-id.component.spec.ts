import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListByIdComponent } from './list-by-id.component';

describe('ListByIdComponent', () => {
  let component: ListByIdComponent;
  let fixture: ComponentFixture<ListByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
