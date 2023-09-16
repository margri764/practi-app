import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerUrlComponent } from './server-url.component';

describe('ServerUrlComponent', () => {
  let component: ServerUrlComponent;
  let fixture: ComponentFixture<ServerUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
