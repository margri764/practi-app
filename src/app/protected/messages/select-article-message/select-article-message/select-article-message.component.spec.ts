import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectArticleMessageComponent } from './select-article-message.component';

describe('SelectArticleMessageComponent', () => {
  let component: SelectArticleMessageComponent;
  let fixture: ComponentFixture<SelectArticleMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectArticleMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectArticleMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
