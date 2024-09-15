import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailAnswerComponent } from './view-detail-answer.component';

describe('ViewDetailAnswerComponent', () => {
  let component: ViewDetailAnswerComponent;
  let fixture: ComponentFixture<ViewDetailAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDetailAnswerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDetailAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
