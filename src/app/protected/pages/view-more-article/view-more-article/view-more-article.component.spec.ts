import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreArticleComponent } from './view-more-article.component';

describe('ViewMoreArticleComponent', () => {
  let component: ViewMoreArticleComponent;
  let fixture: ComponentFixture<ViewMoreArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMoreArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
