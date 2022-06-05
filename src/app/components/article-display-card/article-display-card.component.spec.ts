import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDisplayCardComponent } from './article-display-card.component';

describe('ArticleDisplayCardComponent', () => {
  let component: ArticleDisplayCardComponent;
  let fixture: ComponentFixture<ArticleDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleDisplayCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
