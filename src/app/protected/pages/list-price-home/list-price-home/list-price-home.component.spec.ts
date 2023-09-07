import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPriceHomeComponent } from './list-price-home.component';

describe('ListPriceHomeComponent', () => {
  let component: ListPriceHomeComponent;
  let fixture: ComponentFixture<ListPriceHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPriceHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPriceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
